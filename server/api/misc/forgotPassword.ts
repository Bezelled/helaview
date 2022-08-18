'use strict';

import { Router, Request, Response } from 'express';
import hdb from '../../lib/db.js';
import { generateVerificationCode, getAccountType, validatePostData } from '../../lib/shared.js';

// CREATE TABLE verification_codes
// (
//     email citext NOT NULL,
//     code citext NOT NULL,
//     type citext NOT NULL DEFAULT 'Email',
//     expired bool NOT NULL DEFAULT False,
//     date_created timestamp NOT NULL DEFAULT now()
// );

export default async function addRoute(router: Router): Promise<void>{

    router.post('/forgotPassword', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, ['email']);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        
        const accountDetails = await hdb`
            SELECT id, first_name, email, account_type FROM users WHERE email = ${email};
        `;

        const id: number = accountDetails[0]?.id;
    
        if (id === undefined)
            return res.status(400).json({ error: `That account does not exist. Please consider registering beforehand.` });
        
        await generateVerificationCode(hdb, email, getAccountType(accountDetails[0].account_type), 'Password');
        return res.status(200).json({ message: `Please check your inbox for an e-mail to reset your HelaView password.` });
    });
}