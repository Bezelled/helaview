'use strict';

import { Request, Response, Router } from 'express';
import { HelaEmail } from 'index.js';
import { Emailer } from '../../lib/shared.js';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/admin/rejectTourists', async(req: Request, res: Response) => {
        // eslint-disable-next-line prefer-const
        let { id, name, message } = req.body;
        
        if (isNaN(id))
            return res.status(400).json({ error: 'Please enter a valid, integer tourist ID.' });

        id = Number(id);

        const touristAccount = await hdb`
            SELECT email FROM tourists WHERE id = ${id};
        `;

        if (touristAccount[0]?.email === undefined)
            return res.status(400).json({ error: 'That tourist profile does not exist.' });

        if (!message)
            return res.status(400).json({ error: 'Please enter the rejection reason for that tourist profile.' });
        
        await hdb`
            DELETE * FROM tourists WHERE id = ${id};
        `;
        await hdb`
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
            recipient: touristAccount[0].email,
            subject: 'Your account has been rejected',
            text: `Your HelaView tourist account has been rejected.`,
            html: `Your HelaView tourist account has been rejected for the following reason:<br>
            ${message}`
        };
        await Emailer.sendEmail(rejectionEmail);

        return res.status(200).json({ message: `${name} hotel's profile was rejected.` });
    });
}