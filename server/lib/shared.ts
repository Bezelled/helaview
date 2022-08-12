'use strict';

import { Request, Response } from 'express';
import { randomBytes } from 'crypto';
import  { Sql } from 'postgres';
import { Transporter, createTransport } from 'nodemailer';
import { DOMAIN, MAIL_SERVICE, MAIL_USERNAME, MAIL_PASSWORD, helaPlatform, threeDays, AccountType, JWT_SECRET } from '../config/globals.js';
import { readdirSync } from 'fs';
import { join }  from 'path';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

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
        res.status(400).json({ error: 'POST data cannot be empty.' });
        return false;
    };

    for (const key of reqKeys)
    {
        if (!(keys.includes(key))){
            res.status(400).json({ error: `Invalid field: ${key}.` });
            return false;
        };
        
        if ((req.body[key] === undefined || req.body[key] === null)){
            res.status(400).json({ error: `Please fill out the ${key} field.` });
            return false;
        };
    };

    return true;
}

export function generateJWT(options: object): string{
    return sign(options, JWT_SECRET);
}

export class Emailer {

    private static _transport: Transporter;
   
    static get transport(): Transporter{
        return Emailer._transport;
    }
    
    /**
     * Create an e-mail transport if `Emailer.transport` is undefined.
     */
    private static async createEmailTransport(): Promise<void>{
    
        if (Emailer.transport === undefined){
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
        };
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
    public static async sendVerificationEmail(email: string, senderType: AccountType, verification: string): Promise<void>{
        
        Emailer.createEmailTransport();

        let emailSubject: string = ' account verification for HelaView';
        let url: string = '';

        switch (senderType){
            
            case AccountType.Tourist:
                emailSubject = 'Tourist' + emailSubject;
                
                url = `${DOMAIN}/api/tourists/verify/${email}/${verification}`;
                break;
            
            case AccountType.Hotel:
                emailSubject = 'Hotel' + emailSubject;
                url = `${DOMAIN}/api/hotels/verify/email/${email}/${verification}`;
                break;

            default:
                return; //We don't want to verify an admin account
        };

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

    public static async sendBookingConfirmationEmail(email: string): Promise<void>{
        
        Emailer.createEmailTransport();

        const info = await Emailer.transport.sendMail({
            from: MAIL_USERNAME,
            to: email,
            subject: 'Booking confirmation for HelaView',
            text: 'Your booking has been confirmed.',
            html: `Your booking has been successfully confirmed!<br>
                        <b><u>Booking details:</u></b><br><br>
                        ID: <br>
                        Start date:<br>
                        End date:<br>
                        Duration:<br>
                        Number of rooms:<br>
                        Number of adults:<br>
                        Number of children:<br>
                        Number of babies:<br>
                        Price:<br>
                    `   //Add details
        });
        
        console.log(`[Sent Email]: ${info.messageId}.`);
    }
}

export async function* getRoutes(filename: string, fileType: string): AsyncGenerator<any, void, unknown>{

    let _dirname: string = '';
    let _filename: string = '';

    if (helaPlatform === 'linux'){
        _dirname = filename.substring(0, filename.lastIndexOf('/routes.js'));
        _filename = _dirname;
    } else {
        _dirname = filename.substring(0, filename.lastIndexOf('\\routes.js'));
        _filename = `file:///${_dirname}`;
    };

    for (const routeFile of readdirSync(_dirname)) {
        
        if ((routeFile === 'routes.js') || (!(routeFile.endsWith('.js'))))
            continue;
        
        console.log(`[Adding ${fileType} route]: ${routeFile}.`);
        yield await import(join(_filename, routeFile));
    };
}

export async function generateVerificationCode(hdb: Sql<{bigint: bigint;}>, email: string, accountType: AccountType){
    const token: string = randomBytes(50).toString('hex'); //Generate a token

    //Expire previous verification codes if in development mode
    if (process.env.NODE_ENV !== 'production')
        await hdb`
            UPDATE verification_codes SET expired = True WHERE email = ${email}
        `;
    
    await hdb`
        INSERT INTO verification_codes
        (
            email, code
        )
        VALUES
        (
            ${email}, ${token}
        );`;

    await Emailer.sendVerificationEmail(email, accountType, token);
}

export async function verifyAccount(hdb: Sql<{bigint: bigint;}>, req: Request, res: Response, accountType: AccountType){
    const email: string = req.params.email;
    const code: string = req.params.token;

    const tokenEmail = await hdb`
        SELECT code, date_created FROM verification_codes WHERE email = ${email} AND expired = False;
    `;
        
    const dbCode: string | undefined = tokenEmail[0]?.code; //Get the code property if tokenEmail[0] is not undefined

    if (dbCode === undefined)
        return res.status(400).json({ error: `That account has not requested a valid verification e-mail. Please resend your verification e-mail from your Profile page if you are not verified.` });

    const dateCreated: Date = new Date(tokenEmail[0]['date_created']);
    
    if (dbCode === code){
        await hdb`
            UPDATE verification_codes SET expired = True WHERE email = ${email};
        `;

        if ((new Date().getTime() - threeDays) < dateCreated.getTime()){    //The code is valid if its creation date is less than 3 days
            
            switch (accountType){
                case AccountType.Tourist:
                    await hdb`
                        UPDATE tourists SET email_verified = True WHERE email = ${email};
                    `;
                    break;
                case AccountType.Hotel:
                    await hdb`
                        UPDATE hotels SET email_verified = True WHERE email = ${email};
                    `;
            };

            return res.status(200).json({ message: `Your account has been successfully verified!` });
        } else {
            return res.status(400).json({ error: `This code is expired. Please resend your verification e-mail from your Profile page.` });
        };
    }
    else {
        return res.status(400).json({ error: `An invalid verification code was supplied.` });
    };
}