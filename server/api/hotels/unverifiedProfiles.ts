'use strict';

//Only for admins

// CREATE TABLE hotels
// (
//     id bigserial,
//     email citext PRIMARY KEY,
//     name citext NOT NULL,
//     hash citext NOT NULL,
//     address citext NOT NULL unique,
//     contact_no bigint NOT NULL unique,
//     hotel_type citext,   -- Nullable at registration
//     rating float(2),  -- Nullable at registration
//     email_verified bool NOT NULL DEFAULT False,
//     admin_verified bool NOT NULL DEFAULT False
// );

import { Request, Response, Router } from 'express';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles/pending/:offset/:token', async(req: Request, res: Response) => {

        const offset: number = Number(req.params.offset);

        if (isNaN(offset))
            return res.status(400).json({error: 'Please enter a valid, integer offset.'});

        const hotelPage = await hdb`
            SELECT email, name, address, contact_no, hotel_type, rating, email_verified FROM hotels
            WHERE admin_verified = False id OFFSET ${offset} LIMIT 50;
        `;
        
        return hotelPage;
    });
}