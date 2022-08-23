'use strict';

// for all users - only verified profiles

import { Request, Response, Router } from 'express';
import { HelaDBHotels } from 'index.js';
import { RowList } from 'postgres';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles/:page', async(req: Request, res: Response) => {

        const page: number = (Number(req.params.page) * 10);

        if (isNaN(page))
            return res.status(400).json({error: 'Please enter a valid, integer page.'});

        const hotelProfiles: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
            SELECT
                email,
                name,
                address,
                contact_no,
                hotel_type,
                rating
            FROM hotels
            WHERE email_verified = True
            AND admin_verified = True id
            OFFSET ${page} LIMIT 10;
        `;

        console.log(hotelProfiles);
        return res.status(200).json({message: 'Hi'});
    });
}