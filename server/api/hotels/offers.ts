'use strict';

import { Router, Request, Response } from 'express';
import hdb from '../../lib/db.js';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import { HelaDBOffers } from 'index.js';
import { RowList } from 'postgres';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/hotels/offers',
        authenticateJWT([AccountType.Hotel]),
        async(req: Request, res: Response) => {
            const hotelID: number = Number(req.user.userID);
            const hotel: number[] = [hotelID];
            const { offerCode, name, description } = req.body;
            const startDate: Date = new Date(req.body['start date']);
            const endDate: Date | null = new Date(req.body['end date']);

            // Validate offer code

            const dbOffer: RowList<HelaDBOffers[]> = await hdb<HelaDBOffers[]>`
                SELECT * FROM offers WHERE code = ${offerCode};
            `;

            if (dbOffer.length)
                return res.status(400).json({ error: 'That offer code is already in use. Please try another.' });

            // Validate dates

            if (isNaN(startDate.getTime()))
                return res.status(400).json({ error: 'Please enter a valid starting date.' });

            if (startDate.getTime() <= new Date().getTime())
                return res.status(400).json({ error: 'The start date must be in the future.' });

            if (endDate){

                if (isNaN(endDate.getTime()))
                    return res.status(400).json({ error: 'Please enter a valid ending date, or enter null.' });
                
                if (endDate.getTime() <= startDate.getTime())
                    return res.status(400).json({ error: 'The end date must be after the start date.' });
            };

            try{
                await hdb`
                    INSERT INTO offers
                    (
                        code, name, description, start_date, end_date, hotels
                    )
                    VALUES
                    (
                        ${offerCode},
                        ${name},
                        ${description},
                        ${startDate}::timestamp,
                        ${endDate}::timestamp,
                        ${hotel}::jsonb
                    );
                `;
                return res.status(200).json({ message: `Successfully added your offer with code ${offerCode}.` });
            } catch(err){
                return res.status(500).json({ error: 'Could not add that offer.' });
            };
        }
    );
}