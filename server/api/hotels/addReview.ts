'use strict';

import { Request, Response, Router } from 'express';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';
import { RowList } from 'postgres';
import { HelaDBHotels } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/addReview',
        authenticateJWT([AccountType.Tourist]),
        async(req: Request, res: Response) => {
            const { hotelID, rating, review } = req.params;
            const touristID: number = Number(req.user.userID);

            // Validate hotel

            const hotelDetails: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                SELECT * FROM hotels WHERE id = ${hotelID};
            `;

            if (!hotelDetails.length)
                return res.status(400).json({ error: 'Please select a valid hotel.' });

            // Validate rating

            if ((Number(rating)) < 1 || (Number(rating)) > 5)
                return res.status(400).json({ error: 'Please enter a valid rating between 1 and 5 stars.' });
            
            try{
                await hdb`
                    INSERT INTO reviews
                    (
                        hotel_id, tourist_id, rating, review
                    )
                    VALUES
                    (
                        ${hotelID}, ${touristID}, ${rating}, ${review}
                    );
                `;
                return res.status(200).json({ message: 'Successfully added your review.' });
            } catch(err){
                return res.status(500).json({ error: 'Could not add that review.' });
            };
        });
}