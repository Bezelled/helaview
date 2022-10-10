'use strict';

// for all users - only verified profiles

import { Request, Response, Router } from 'express';
import { HelaDBHotels } from 'index.js';
import { RowList } from 'postgres';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles/:page', async(req: Request, res: Response) => {

        const page: number = ((Number(req.params.page) - 1) * 10);

        if (isNaN(page) || page < 0)
            return res.status(400).json({error: 'Please enter a valid, integer page.'});

        const dbHotelProfiles: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
            SELECT
                id,
                email,
                name,
                address,
                contact_no,
                hotel_type,
                rating
            FROM hotels 
            WHERE email_verified = True
            AND admin_verified = True
            ORDER BY id ASC
            OFFSET ${page}
            LIMIT 10;
        `;

        if (!dbHotelProfiles.length)
            return res.status(400).send({error: 'No hotel profiles found.'});

        const hotelProfiles: {
            email: string;
            name: string;
            address: string;
            'contact no': number;
            'hotel type': string;
            rating: number;
        }[] = [];
        
        dbHotelProfiles.forEach(hotel => {
            hotelProfiles.push({
                'id': Number(hotel.id),
                'email': hotel.email,
                'name': hotel.name,
                'address': hotel.address,
                'contact no': Number(hotel.contact_no),
                'hotel type': hotel.hotel_type,
                'rating': Number(hotel.rating)
            });
        });
        return res.status(200).json({ profiles: hotelProfiles });
    });
}