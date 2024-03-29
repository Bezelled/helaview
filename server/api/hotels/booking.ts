// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

'use strict';

import { Router, Request, Response } from 'express';
import { HelaBooking, HelaDBBooking, HelaDBHotels, HelaDBOffers, HelaDBTourists } from 'index.js';
import { RowList } from 'postgres';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';
import { Emailer } from '../../lib/shared.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/hotels/booking',
        authenticateJWT([AccountType.Tourist]),
        async(req: Request, res: Response) => {

            // Validate amount

            if (isNaN(req.body.amount))
                return res.status(400).json({ error: 'Please enter a valid booking price.' });

            const amount: number = Number(req.body.amount);

            // Validate head count

            const numOfAdults: number = Number(req.body['num of adults']);
            const numOfChildren: number = Number(req.body['num of children']);
            const numOfBabies: number = Number(req.body['num of babies']);

            const headCount: {
                'adults': number;
                'children': number;
                'babies': number;
            } = {
                'adults': numOfAdults,
                'children': numOfChildren,
                'babies': numOfBabies
            };

            // Validate tourist email

            const touristAccount: RowList<HelaDBTourists[]> = await hdb<HelaDBTourists[]>`
                SELECT id FROM tourists WHERE email = ${req.body['tourist email']};
            `;

            if (!touristAccount.length)
                return res.status(400).json({ error: `That tourist account does not exist. Please consider registering beforehand.` });

            const touristID: number = Number(touristAccount[0].id);
            const touristEmail: string = req.body['tourist email'];

            // Validate hotel email

            const hotelAccount: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                SELECT id, name, available_rooms FROM hotels WHERE email = ${req.body['hotel email']};
            `;
        
            if (!hotelAccount.length)
                return res.status(400).json({ error: `That hotel account does not exist. Please consider registering beforehand.` });

            const hotelDBID: bigint = hotelAccount[0]?.id;

            // Get hotel account details

            const hotelID: number = Number(hotelDBID);
            const hotelEmail: string = req.body['hotel email'];
            const hotelName: string = hotelAccount[0].name;
            const availableRooms: number = Number(hotelAccount[0].available_rooms);
            const touristRooms: number = Number(req.body['rooms']);

            //Need to cast the user's Dates to timestamps, so we can store it in the database

            const checkInDate: string = new Date(req.body['check in date']).toISOString();
            const checkOutDate: string = new Date(req.body['check out date']).toISOString();

            // Check if the hotel is available during those dates

            const bookings: RowList<HelaDBBooking[]> = await hdb<HelaDBBooking[]>`
                SELECT num_of_rooms FROM bookings
                WHERE check_in_date >= ${checkInDate}::timestamp
                AND check_out_date <= ${checkOutDate}::timestamp;
            `;

            let bookedRooms: number = 0;
            
            for (let i = 0; i < bookings.length; i++) {
                bookedRooms += Number(bookings[i].num_of_rooms);
            };
            
            if (bookedRooms >= availableRooms)
                return res.status(400).json({ error: `${hotelName} is fully booked during those dates. Please select another hotel, or choose different dates.` });

            // Check if the hotel has enough rooms

            if (touristRooms > availableRooms)
                return res.status(400).json({ error: `${hotelName} does not have enough rooms. Please select another hotel, or choose a smaller number of rooms.` });

            // Validate offer code

            let offerCode: string | null = null;
            
            if (!req.body['offer code']){
                const offerDetails: RowList<HelaDBOffers[]> = await hdb<HelaDBOffers[]>`
                    SELECT
                        name,
                        expired,
                        end_date,
                        hotels
                    FROM offers
                    WHERE code = ${req.body['offer code']};
                `;

                if (!offerDetails.length)
                    return res.status(400).json({ error: `That offer code does not exist.` });

                const offerDBExpired: boolean = offerDetails[0]?.expired;

                if (offerDBExpired === true){
                    return res.status(400).json({ error: `That offer code has expired.` });
                } else {
                    
                    if (offerDetails[0].end_date !== null){
                        const offerEndDate: Date = new Date(offerDetails[0].end_date);
                        
                        if (new Date().getTime() < offerEndDate.getTime()){
                            offerCode = req.body['offer code'];
                        } else {
                            
                            await hdb`
                                UPDATE offers SET expired = True WHERE code = ${req.body['offer code']};
                            `;
                            
                            return res.status(400).json({ error: `That offer code has expired.` });
                        };
                    };
                };
            };
            
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const helaDBBooking: RowList<HelaDBBooking[]> = await hdb<HelaDBBooking[]>`
                INSERT INTO bookings
                (
                    amount, head_count, tourist_id, tourist_email, hotel_id, hotel_email, offer_code, start_date, end_date
                )
                VALUES
                (
                    ${amount},
                    ${headCount}::jsonb,
                    ${touristID},
                    ${touristEmail},
                    ${hotelID},
                    ${hotelEmail},
                    ${offerCode},
                    ${checkInDate}::timestamp,
                    ${checkOutDate}::timestamp
                )
                RETURNING (id);
            `;

            const helaBooking: HelaBooking = {
                id: helaDBBooking[0].id,
                price: amount,
                numOfAdults: numOfAdults,
                numOfChildren: numOfChildren,
                numOfBabies: numOfBabies,
                touristEmail: touristEmail,
                offerCode: offerCode,
                checkIn: new Date(req.body['check in date']),
                checkOut: new Date(req.body['check out date']),
                hotelName: hotelName,
                numOfRooms: touristRooms
            };

            await Emailer.sendBookingConfirmationEmail(helaBooking);
            return res.status(200).json({ message: `Your booking is confirmed for ${new Date(checkInDate).toLocaleString('en-US', { timeZone: 'Asia/Colombo'})}. You will receive an e-mail shortly.` });
        }
    );

}