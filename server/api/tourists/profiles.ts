'use strict';

//For tourists

import { Request, Response, Router } from 'express';
import hdb from '../../lib/db.js';

// CREATE TABLE tourists
// (
//     id bigserial,
//     email citext PRIMARY KEY,
//     first_name citext NOT NULL,
//     last_name citext NOT NULL,
//     hash citext NOT NULL,
//     passport_no citext unique,  -- Nullable at registration
//     age smallint NOT NULL,
//     gender bool NOT NULL DEFAULT True,
//     country citext NOT NULL,
//     contact_no bigint NOT NULL unique,
//     email_verified bool NOT NULL DEFAULT False
// );

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/tourist/profiles/:email', async(req: Request, res: Response) => {

        const email: string = req.params.email;
        const touristAccount = await hdb`
            SELECT id, first_name, last_name, age, gender, country, contact_no, email_verified FROM tourists WHERE email = ${email};
        `;

        if (Number.isNaN(req.params.offset))
            return res.status(400).send({error: 'Please enter a valid, integer offset.'});

        const offset: number = Number(req.params.offset);

        await hdb`
            SELECT email, name, address, contact_no, hotel_type, rating FROM hotels
            WHERE email_verified = True AND admin_verified = True id OFFSET ${offset} LIMIT 50;
        `;

        console.log(req);
        return res.status(200).send({message: 'Hi'});
    });
}