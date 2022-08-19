'use strict';

import { Request, Response, Router } from 'express';
import { HelaEmail } from 'index.js';
import { Emailer } from '../../lib/shared.js';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/admin/verifyHotels', async(req: Request, res: Response) => {
        // eslint-disable-next-line prefer-const
        let { id, email, name } = req.body;

        if (isNaN(id))
            return res.status(400).json({ error: 'Please enter a valid, integer hotel ID.' });

        id = Number(id);

        try{
            await hdb`
                UPDATE hotels SET admin_verified = True WHERE id = ${id};
            `;

            const approvalEmail: HelaEmail = {
                recipient: email,
                subject: 'Your account has been approved',
                text: `Your HelaView hotel account has been approved.`,
                html: `Your HelaView tourist account has been approved!`
            };
            await Emailer.sendEmail(approvalEmail);

            return res.status(200).json({ message: `${name} hotel's profile was approved.` });
        } catch(e){
            return res.status(400).json({ message: `Could not approve ${name} hotel's profile.` });
        };

    });
}