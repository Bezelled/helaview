'use strict';

import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import  { Sql } from 'postgres';
import { Transporter, createTransport } from 'nodemailer';
import { DOMAIN, MAIL_SERVICE, MAIL_USERNAME, MAIL_PASSWORD, emailer, threeDays, AccountType } from '../config/globals.js';

/**
 * @param {Request} req
 *  The express request.
 * @param {Response} res
 *  The express response.
 * @param {string[]} keys
 *  The string array of keys to cross-check fields with.
 * @returns {boolean}
 *  An indicator of whether to proceed handling the request or not.
 */
export function validatePostData(req: Request, res: Response, keys: string[]): boolean{
    console.log(`[Received]: ${JSON.stringify(req.body)}.`);
    
    const reqKeys: string[] = Object.keys(req.body);
    
    if (reqKeys.length === 0){
        res.status(400).send({ error: 'POST data cannot be empty.' });
        return false;
    };

    for (const key of reqKeys)
    {
        if (!(keys.includes(key))){
            res.status(400).send({ error: `Invalid field: ${key}.` });
            return false;
        };
        
        if ((req.body[key] === undefined || req.body[key] === null)){
            res.status(400).send({ error: `Please fill out the ${key} field.` });
            return false;
        };
    };

    return true;
}

export class Emailer {

    private static _transport: Transporter;
   
    static get transport(): Transporter{
        return Emailer._transport;
    }
    
    /**
     * Create an e-mail transport if `Emailer.transport` is undefined.
     */
    private async createEmailTransport(): Promise<void>{
    
        Emailer._transport = createTransport({
            service: MAIL_SERVICE,
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: MAIL_USERNAME,
                pass: MAIL_PASSWORD,
            },
            logger: true
        });
    }

    /**
     * Send an account verification e-mail upon registration.
     * 
     * @param {string} email
     *  The e-mail address to send an e-mail to.
     * @param {AccountType} senderType
     *  The profile type.
     * @param {string} verification
     *  The verification ID.
     */
    public async sendVerificationEmail(email: string, senderType: AccountType, verification: string): Promise<void>{
        
        if (Emailer.transport === undefined)
            await this.createEmailTransport();

        let emailSubject: string = ' account verification for HelaView';
        let url: string = '';

        switch (senderType){
            
            case AccountType.Tourist:
                emailSubject = 'Tourist' + emailSubject;
                
                url = `${DOMAIN}/api/tourists/verify/${email}/${verification}`;
                break;
            
            case AccountType.Hotel:
                emailSubject = 'Hotel' + emailSubject;
                url = `${DOMAIN}/api/hotels/verify/${email}/${verification}`;
                break;

            default:
                return; //We don't want to verify an admin account
        }

        url = encodeURI(url);

        const info = await Emailer.transport.sendMail({
            from: MAIL_USERNAME,
            to: email,
            subject: emailSubject,
            text: 'Please confirm your email account.',
            html: `Hello,<br> Please click on the link to verify your email.<br><a href="${url}">Click here to verify</a>`
        });
        
        console.log(`[Sent Email]: ${info.messageId}.`);
    }
}

export async function generateVerificationCode(hdb: Sql<{bigint: bigint;}>, email: string, accountType: AccountType){
    const token: string = randomBytes(50).toString('hex'); //Generate a token

    await hdb`
        UPDATE verification_codes SET expired = True WHERE email = ${email}
        `;  //This should be moved to profile deletion once that feature is implemented.
    
    await hdb`
        INSERT INTO verification_codes
        (
            email, code
        )
        VALUES
        (
            ${email}, ${token}
        );`;

    await emailer.sendVerificationEmail(email, accountType, token);
}

export async function verifyAccount(hdb: Sql<{bigint: bigint;}>, req: Request, res: Response, accountType: AccountType){
    const email: string = req.params.email;
    const code: string = req.params.token;

    const tokenEmail = await hdb`
        SELECT code, date_created FROM verification_codes WHERE email = ${email} AND expired = False;
    `;
        
    const dbCode: string | undefined = tokenEmail[0]?.code; //Get the code property if tokenEmail[0] is not undefined

    if (dbCode === undefined)
        return res.status(400).send({ error: `That account has not requested a valid verification e-mail. Please resend your verification e-mail from your Profile page if you are not verified.` });

    const dateCreated: Date = new Date(tokenEmail[0]['date_created']);
    
    if (dbCode === code){
        await hdb`
            UPDATE verification_codes SET expired = True WHERE email = ${email};
        `;

        if ((new Date().getTime() - threeDays) < dateCreated.getTime()){    //The code is valid if its creation date is less than 3 days
            
            switch (accountType){
                case AccountType.Tourist:
                    await hdb`
                        UPDATE tourists SET verified = True WHERE email = ${email};
                    `;
                    break;
                case AccountType.Hotel:
                    await hdb`
                        UPDATE hotels SET verified = True WHERE email = ${email};
                    `;
                    break;
            };

            return res.status(200).send({ message: `Your account has been successfully verified!` });
        } else {
            return res.status(400).send({ error: `This code is expired. Please resend your verification e-mail from your Profile page.` });
        };
    }
    else {
        return res.status(400).send({ error: `An invalid verification code was supplied.` });
    };
}