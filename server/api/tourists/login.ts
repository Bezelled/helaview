'use strict';

import { Router, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { userLoginKeys } from '../../config/globals.js';
import hdb from '../../lib/db.js';
import { validatePostData } from '../../lib/shared.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/tourists/login', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, userLoginKeys);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        const password: string = req.body.password;
        
        const hashedPassword = await hdb`
            SELECT hash FROM tourists WHERE email = ${email};
        `;
    
        if (hashedPassword === undefined)
            return res.status(400).send({ error: `That account does not exist. Please consider registering beforehand.` });
        
        const valid: boolean = await compare(password, String(hashedPassword));
        
        if (valid === true){
            console.log(`${email} has successfully logged in.`);
            return res.status(200).send({ message: `${email} has successfully logged in.` });
        };
    });
}