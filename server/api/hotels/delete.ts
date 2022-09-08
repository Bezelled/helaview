'use strict';

import { Router, Request, Response } from 'express';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';
import { RowList } from 'postgres';
import { HelaDBBooking, HelaDBHotels } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{

    router.delete('/hotels/delete/:email',
        authenticateJWT([AccountType.Hotel, AccountType.Admin]),
        async(req: Request, res: Response) => {
            const email: string = req.params.email;
            
            const hotelAccount: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                SELECT id FROM hotels WHERE email = ${email});
            `;

            if (!hotelAccount.length)
                return res.status(400).json({ error: `That hotel account does not exist.` });

            const hotelDBID: bigint = hotelAccount[0].id;

            // TODO: Deleting profile logic - delete all bookings, offers, and reviews

            // Check if the hotel has any incomplete bookings

            const pendingBookings: RowList<HelaDBBooking[]> = await hdb<HelaDBBooking[]>`
                SELECT * FROM bookings
                WHERE hotel_id = ${hotelDBID}
                AND check_out_date > ${new Date().toISOString()}::timestamp;
            `;

            if (pendingBookings.length){ // If the hotel has pending bookings
                
                await hdb`
                    UPDATE hotel SET available_rooms = 0 WHERE id = ${hotelDBID};
                `;  // Ensure that the hotel cannot be booked further

                return res.status(400).json({ error: `
                    Your hotel still has some pending bookings; you may delete your profile once they are completed.
                    Your profile has been updated so that you cannot receive further bookings.
                    Please contact HelaView Support for more information.`
                });
            };

            try{
                await hdb`
                    DELETE FROM hotels WHERE email = ${email};
                `;
                await hdb`
                    DELETE FROM bookings
                    WHERE hotel_email = ${email}
                    AND check_out_date > ${new Date().toISOString()}::timestamp;
                `;
                await hdb`
                    DELETE FROM verification_codes WHERE email = ${email};
                `;
            } catch(err){
                return res.status(400).json({ error: `Could not delete your hotel profile, please contact HelaView Support.` });
            };
            
            return res.status(200).json({ message: `Successfully deleted your hotel profile.` });
        }
    );
}