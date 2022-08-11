'use strict';

import { Router, Request, Response } from 'express';
import hdb from '../../lib/db.js';

// CREATE TABLE bookings
// (
//     id bigserial PRIMARY KEY,
//     amount numeric(20) NOT NULL,
//     head_count smallint NOT NULL,
//     tourist_id bigint NOT NULL,
//     tourist_email citext NOT NULL,
//     hotel_id bigint NOT NULL,
//     hotel_email citext NOT NULL,
//     offer_code citext REFERENCES offers(code),
//     start_date timestamp NOT NULL,
//     end_date timestamp NOT NULL ,
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
            return res.status(400).send({error: 'Please enter a valid booking price.'});

        const amount: number = Number(req.body.amount);

        //Validate head count

        if (Number.isNaN(req.body['head count']))
            return res.status(400).send({error: 'Please enter a valid head count.'});

        const headCount: number = Number(req.body['head count']);

        //Validate tourist email

        const touristAccount = await hdb`
            SELECT id FROM tourists WHERE email = ${req.body['tourist email']};
        `;

        const touristDBID: number = touristAccount[0]?.id; //Get the id property if touristAccount[0] is not undefined
    
        if (touristDBID === undefined)
            return res.status(400).send({ error: `That account does not exist. Please consider registering beforehand.` });

        const touristID: number = Number(touristDBID);
        const touristEmail: string = req.body['tourist email'];

        //Validate hotel email

        const hotelAccount = await hdb`
            SELECT id FROM hotels WHERE email = ${req.body['hotel email']};
        `;

        const hotelDBID: number = hotelAccount[0]?.id; //Get the id property if hotelAccount[0] is not undefined
    
        if (hotelDBID === undefined)
            return res.status(400).send({ error: `That account does not exist. Please consider registering beforehand.` });

        const hotelID: number = Number(hotelDBID);
        const hotelEmail: string = req.body['hotel email'];

        //Validate offer code

        let offerCode: string | null = null;
        
        if (req.body['offer code'] !== null){
            const offerDetails = await hdb`
                SELECT name, expired, end_date, hotels FROM offers WHERE code = ${req.body['offer code']};
            `;

            const offerDBName: string | undefined = offerDetails[0]?.name; //Get the name property if offerDetails[0] is not undefined
        
            if (offerDBName === undefined)
                return res.status(400).send({ error: `That offer code does not exist.` });

            const offerDBExpired: boolean = offerDetails[0]?.expired;

            if (offerDBExpired === true){
                return res.status(400).send({ error: `That offer code has expired.` });
            } else {
                
                if (offerDetails[0].end_date !== null){
                    const offerEndDate: Date = new Date(offerDetails[0].end_date);
                    
                    if (new Date().getTime() < offerEndDate.getTime()){
                        offerCode = req.body['offer code'];
                    } else {
                        
                        await hdb`
                            UPDATE offers SET expired = True WHERE code = ${req.body['offer code']};
                        `;
                        
                        return res.status(400).send({ error: `That offer code has expired.` });
                    };
                };
            };
        };

        const startDate: string = new Date(req.body['start date']).toISOString();
        const endDate: string = new Date(req.body['end date']).toISOString();
        
        await hdb`
            INSERT INTO bookings
            (
                amount, head_count, tourist_id, tourist_email, hotel_id, hotel_email, offer_code, start_date, end_date
            )
            VALUES
            (
                ${amount}, ${headCount}, ${touristID}, ${touristEmail}, ${hotelID}, ${hotelEmail}, ${offerCode}, ${startDate}::timestamp, ${endDate}::timestamp
            );
        `;

        return res.status(200).send({ message: `Your booking is confirmed for ${startDate}. You will receive an e-mail shortly.` });
    });

}