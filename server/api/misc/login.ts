'use strict';

import { Router, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { userLoginKeys } from '../../config/globals.js';
import hdb from '../../lib/db.js';
import { validatePostData } from '../../lib/shared.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/login', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, userLoginKeys);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        const password: string = req.body.password;
        
        const accountDetails = await hdb`
            SELECT hash, account_type FROM users WHERE email = ${email};
        `;

        const hash: string | undefined = accountDetails[0]?.hash;
    
        if (hash === undefined)
            return res.status(400).json({ error: `That account does not exist. Please consider registering beforehand.` });
        
        const valid: boolean = await compare(password, String(hash));
        
        if (valid === true){
            const accountType: string = accountDetails[0]?.account_type;
            console.log(`${email} | ${accountType} has successfully logged in.`);   //redirect to relevant account type page
            return res.status(200).json({ message: `${email} has successfully logged in.` });
        } else {
            console.log(`${email} has not logged in.`);
            return res.status(400).json({ error: `Invalid password.` });
        }
    });
}