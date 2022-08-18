'use strict';

import { Router, Request, Response } from 'express';
import hdb from '../../lib/db.js';

// CREATE TABLE bookings
// (
//     id bigserial PRIMARY KEY,
//     price numeric(15,6) NOT NULL,
//     price_per_night numeric(15,6) NOT NULL,
//     num_of_nights smallint NOT NULL DEFAULT 1,
//     num_of_rooms smallint NOT NULL DEFAULT 1,
//     head_count jsonb NOT NULL DEFAULT '{"Adult": 1}'::jsonb,
//     tourist_id bigint NOT NULL,
//     tourist_email citext NOT NULL,
//     hotel_id bigint NOT NULL,
//     hotel_email citext NOT NULL,
//     offer_code citext REFERENCES offers(code) ON DELETE SET NULL,
//     check_in_date timestamp NOT NULL,
//     check_out_date timestamp NOT NULL ,
//     creation_date timestamp NOT NULL DEFAULT now()
// );

// CREATE TABLE offers
// (
//     id bigserial,
//     code citext PRIMARY KEY,
//     name citext NOT NULL,
//     description citext NOT NULL,
//     start_date timestamp NOT NULL,
//     end_date timestamp,  -- Nullable at addition
//     expired bool NOT NULL DEFAULT False,
//     hotels jsonb NOT NULL DEFAULT '[]'
// );

export default async function addRoute(router: Router): Promise<void>{

    router.post('/booking', async(req: Request, res: Response) => {

        //Validate amount

        if (Number.isNaN(req.body.amount))
            return res.status(400).json({error: 'Please enter a valid booking price.'});

        const amount: number = Number(req.body.amount);

        //Validate head count

        if (Number.isNaN(req.body['head count']))
            return res.status(400).json({error: 'Please enter a valid head count.'});

        const headCount: number = Number(req.body['head count']);

        //Validate tourist email

        const touristAccount = await hdb`
            SELECT id FROM tourists WHERE email = ${req.body['tourist email']};
        `;

        const touristDBID: number = touristAccount[0]?.id;
    
        if (touristDBID === undefined)
            return res.status(400).json({ error: `That tourist account does not exist. Please consider registering beforehand.` });

        const touristID: number = Number(touristDBID);
        const touristEmail: string = req.body['tourist email'];

        //Validate hotel email

        const hotelAccount = await hdb`
            SELECT id, name, available_rooms FROM hotels WHERE email = ${req.body['hotel email']};
        `;

        const hotelDBID: number = hotelAccount[0]?.id;
    
        if (hotelDBID === undefined)
            return res.status(400).json({ error: `That hotel account does not exist. Please consider registering beforehand.` });

        const hotelID: number = Number(hotelDBID);
        const hotelEmail: string = req.body['hotel email'];
        const hotelName: string = hotelAccount[0].name;
        const availableRooms: number = Number(hotelAccount[0].available_rooms);

        const checkInDate: string = new Date(req.body['check in date']).toISOString();
        const checkOutDate: string = new Date(req.body['check out date']).toISOString();

        const bookings = await hdb`
            SELECT id FROM bookings
            WHERE check_in_date > ${checkInDate}::timestamp
            AND check_out_date < ${checkOutDate}::timestamp;
        `;
        
        if (bookings.length >= availableRooms)
            return res.status(400).json({ error: `${hotelName} is fully booked during those dates. Please select another hotel, or choose different dates.` });

        //Validate offer code

        let offerCode: string | null = null;
        
        if (req.body['offer code'] !== null){
            const offerDetails = await hdb`
                SELECT name, expired, end_date, hotels FROM offers WHERE code = ${req.body['offer code']};
            `;

            const offerDBName: string | undefined = offerDetails[0]?.name;
        
            if (offerDBName === undefined)
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
        
        await hdb`
            INSERT INTO bookings
            (
                amount, head_count, tourist_id, tourist_email, hotel_id, hotel_email, offer_code, start_date, end_date
            )
            VALUES
            (
                ${amount}, ${headCount}, ${touristID}, ${touristEmail}, ${hotelID}, ${hotelEmail}, ${offerCode}, ${checkInDate}::timestamp, ${checkOutDate}::timestamp
            );
        `;

        return res.status(200).json({ message: `Your booking is confirmed for ${new Date(checkInDate).toLocaleString('en-US', { timeZone: 'Asia/Colombo'})}. You will receive an e-mail shortly.` });
    });

}