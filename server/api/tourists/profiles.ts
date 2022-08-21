'use strict';

//For tourists

import { Request, Response, Router } from 'express';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';
import { AccountType } from 'server/config/globals.js';


export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/tourist/profiles/:id',
        authenticateJWT([AccountType.Tourist, AccountType.Admin]),
        async(req: Request, res: Response) => {

            const email: string = req.params.id;
            const offset: number = Number(req.params.offset);

            const touristAccount = await hdb`
                SELECT id, first_name, last_name, age, gender, country, contact_no, email_verified FROM tourists WHERE email = ${email};
            `;

            if (isNaN(offset))
                return res.status(400).json({error: 'Please enter a valid, integer offset.'});

            return res.status(200).json({message: touristAccount});
        }
    );
}