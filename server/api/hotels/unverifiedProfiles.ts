'use strict';

//Only for admins

import { Request, Response, Router } from 'express';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';


export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles/pending/:offset/:token',
        authenticateJWT([AccountType.Admin]),
        async(req: Request, res: Response) => {

            const offset: number = Number(req.params.offset);

            if (isNaN(offset))
                return res.status(400).json({error: 'Please enter a valid, integer offset.'});

            const hotelPage = await hdb`
                SELECT email, name, address, contact_no, hotel_type, rating, email_verified FROM hotels
                WHERE admin_verified = False id OFFSET ${offset} LIMIT 50;
            `;
        
            return hotelPage;
        }
    );
}