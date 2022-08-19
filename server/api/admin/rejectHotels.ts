'use strict';

import { Request, Response, Router } from 'express';
import { Emailer } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { HelaEmail } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/admin/rejectHotels', async(req: Request, res: Response) => {
        // eslint-disable-next-line prefer-const
        let { id, name, message } = req.body;
        
        if (isNaN(id))
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

        const rejectionEmail: HelaEmail = {
            recipient: hotelAccount[0].email,
            subject: 'Your account has been rejected',
            text: `Your HelaView hotel account has been rejected.`,
            html: `Your HelaView hotel account has been rejected for the following reason:<br>
            ${message}`
        };
        await Emailer.sendEmail(rejectionEmail);

        return res.status(200).json({ message: `${name} hotel's profile was rejected.` });
    });
}