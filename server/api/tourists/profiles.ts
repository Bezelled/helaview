'use strict';

//For tourists

import { Request, Response, Router } from 'express';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';
import { AccountType } from '../../config/globals.js';
import { RowList } from 'postgres';
import { HelaDBTourists } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/tourist/profiles/:id',
        authenticateJWT([AccountType.Admin]),
        async(req: Request, res: Response) => {
            const id: number = Number(req.params.id);

            const touristAccount: RowList<HelaDBTourists[]> = await hdb<HelaDBTourists[]>`
                SELECT first_name, last_name, age, gender, country, contact_no, email_verified FROM tourists WHERE id = ${id};
            `;

            if (!touristAccount.length)
                return res.status(404).json({ error: 'Tourist not found.' });
            
            return res.status(200).json({
                message: 'HelaView | Profile',
                'user details':{
                    'first name': touristAccount[0].first_name,
                    'last name': touristAccount[0].last_name,
                    'age': touristAccount[0].age,
                    'gender': touristAccount[0].gender,
                    'country': touristAccount[0].country,
                    'contact number': touristAccount[0].contact_no,
                    'verified': touristAccount[0].email_verified
                }
            });
        }
    );
}