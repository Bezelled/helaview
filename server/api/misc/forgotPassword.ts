'use strict';

import { Router, Request, Response } from 'express';
import { RowList } from 'postgres';
import { HelaDBUsers } from 'index.js';
import hdb from '../../lib/db.js';
import { generateVerificationCode, getAccountType, validatePostData } from '../../lib/shared.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/forgotPassword', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, ['email']);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        
        const accountDetails: RowList<HelaDBUsers[]> = await hdb<HelaDBUsers[]>`
            SELECT email, account_type FROM users WHERE email = ${email};
        `;

        const dbEmail: string = accountDetails[0]?.email;
    
        if (dbEmail === undefined)
            return res.status(400).json({ error: `That account does not exist. Please consider registering beforehand.` });
        
        await generateVerificationCode(hdb, dbEmail, getAccountType(accountDetails[0].account_type), 'Password');
        return res.status(200).json({ message: `Please check your inbox for an e-mail to reset your HelaView password.` });
    });
}