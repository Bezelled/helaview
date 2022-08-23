'use strict';

import { Request, Response, Router } from 'express';
import { Emailer } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { HelaDBHotels, HelaEmail } from 'index.js';
import { RowList } from 'postgres';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/admin/rejectHotels', async(req: Request, res: Response) => {
        // eslint-disable-next-line prefer-const
        let { id, name, message } = req.body;
        
        if (isNaN(id))
            return res.status(400).json({ error: 'Please enter a valid, integer hotel ID.' });

        id = Number(id);

        const hotelAccount: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
            SELECT email FROM hotels WHERE id = ${id};
        `;

        if (!hotelAccount.length)
            return res.status(400).json({ error: 'That hotel profile does not exist.' });

        if (!message)
            return res.status(400).json({ error: 'Please enter the rejection reason for that hotel profile.' });
        
        await hdb`
            UPDATE hotels SET admin_verified = False WHERE id = ${id};
        `;
        await hdb`
            INSERT INTO hotel_logs
            (
                description, hotel_id, admin_id
            )
            VALUES
            (
                'A hotel was rejected: ${message}', ${id}, ${req.user.userID}
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