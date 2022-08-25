'use strict';

import { Router, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { userLoginKeys } from '../../config/globals.js';
import hdb from '../../lib/db.js';
import { validatePostData } from '../../lib/shared.js';
import { RowList } from 'postgres';
import { HelaDBUsers } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/login', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, userLoginKeys);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        
        const accountDetails: RowList<HelaDBUsers[]> = await hdb<HelaDBUsers[]>`
            SELECT hash, account_type, active FROM users WHERE email = ${email};
        `;
    
        if (!accountDetails.length)
            return res.status(400).json({ error: `That account does not exist. Please consider registering beforehand.` });
        
        const active: boolean = accountDetails[0].active;
        
        if (!active)
            return res.status(400).json({ error: `That account is banned. Please contact HelaView Support to reinstate it.` });
        
        const password: string = req.body.password;
        const hash: string = accountDetails[0].hash;
        const valid: boolean = await compare(password, String(hash));
        
        if (valid === true){
            const accountType: string = accountDetails[0].account_type;
            console.log(`${email} | ${accountType} has successfully logged in.`);   //redirect to relevant account type page
            return res.status(200).json({ message: `${email} has successfully logged in.` });
        } else {
            console.log(`${email} has not logged in.`);
            return res.status(400).json({ error: `Invalid password.` });
        }
    });
}