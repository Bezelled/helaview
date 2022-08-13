'use strict';

import { Request, Response, Router } from 'express';
import { verifyAccount } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { AccountType } from '../../config/globals.js';

// CREATE TABLE hotel_logs
// (
//     description citext NOT NULL,
//     hotel_id bigint NOT NULL,
//     admin_id bigint NOT NULL
// );

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/admin/rejectHotels', async(req: Request, res: Response) => {
        let { id, name, message } = req.body;
        
        if (Number.isNaN(id))
            return res.status(400).json({ error: 'Please enter a valid, integer hotel ID.' });

        id = Number(id);

        const hotelAccount = await hdb`
            SELECT email FROM hotels WHERE id = ${id}`;
        ;

        if (hotelAccount[0]?.email === undefined)
            return res.status(400).json({ error: 'That hotel profile does not exist.' });

        if (!message)
            return res.status(400).json({ error: 'Please enter the rejection reason for that hotel profile.' });
        
        await hdb`
            UPDATE hotels SET admin_verified = False WHERE id = ${id};
            
            INSERT INTO hotel_logs
            (
                hotel_id, message
            )
            VALUES
            (
                ${id}, ${message}
            );
        `;

        return res.status(200).json({ message: `${name} hotel's profile was rejected.` });
    });
}