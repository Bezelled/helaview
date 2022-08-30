'use strict';

import { Request, Response, Router } from 'express';
import hdb from '../../lib/db.js';
import { RowList } from 'postgres';
import { HelaDBHotels, HelaDBReviews } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/reviews',
        async(req: Request, res: Response) => {
            const { hotelID } = req.params;

            // Validate hotel

            const hotelDetails: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                SELECT * FROM hotels WHERE id = ${hotelID};
            `;

            if (!hotelDetails.length)
                return res.status(400).json({ error: 'That hotel account was not found.' });

            const hotelReviews: RowList<HelaDBReviews[]> = await hdb<HelaDBReviews[]>`
                SELECT * FROM reviews WHERE hotel_id = ${hotelID};
            `;

            if (!hotelReviews.length)
                return res.status(400).json({ error: 'There are currently no reviews for that hotel.' });
            
            return res.status(200).json({ reviews: hotelReviews });
        });
}