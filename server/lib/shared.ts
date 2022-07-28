'use strict';

import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import  { Sql } from 'postgres';
import { Transporter, TestAccount, createTransport, createTestAccount, getTestMessageUrl } from 'nodemailer';
import { emailer, AccountType } from '../config/globals.js';

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
        const testAccount: TestAccount = await createTestAccount();
    
        Emailer._transport = createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            // requireTLS: true,
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
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

        let emailSubject: string = 'account verification for HelaView';
        let url: string = '';

        switch (senderType){
            
            case AccountType.Tourist:
                emailSubject = 'Tourist' + emailSubject;
                url = `https://helaview.lk/api/tourists/verify/${verification}`;
                break;
            
            case AccountType.Hotel:
                emailSubject = 'Hotel' + emailSubject;
                url = `https://helaview.lk/api/hotels/verify/${verification}`;
                break;

            case AccountType.Admin:
                emailSubject = 'Admin' + emailSubject;
                url = `https://helaview.lk/api/admins/verify/${verification}`;
                break;
        }

        const info = await Emailer.transport.sendMail({
            from: '"HelaView 🏨"  <verification@helaview.lk>',
            to: email,
            subject: emailSubject,
            text: 'Please confirm your email account.',
            html: `Hello,<br> Please click on the link to verify your email.<br><a href="${url}">Click here to verify</a>`
        });
        
        console.log(`[Sent Email]: ${info.messageId}.`);
        console.log(`[Message Preview]: ${getTestMessageUrl(info)}`); // Preview only available when sending through an Ethereal account
    }
}

export async function generateVerificationCode(hdb: Sql<{bigint: bigint;}>, email: string, accountType: AccountType){
    const token: string = randomBytes(50).toString('hex'); //Generate a token
    
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