'use strict';

//for all users - only verified profiles

import { Request, Response, Router } from 'express';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles/:offset', async(req: Request, res: Response) => {

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