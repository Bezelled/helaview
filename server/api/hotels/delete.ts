'use strict';

import { Router, Request, Response } from 'express';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/delete/:email', async(req: Request, res: Response) => {
        const email: string = req.params.email;
        
        const hotelAccount = await hdb`
            SELECT id FROM hotels WHERE email = ${email});
        `;

        const hotelDBID: number = hotelAccount[0]?.id;
    
        if (hotelDBID === undefined)
            return res.status(400).json({ error: `That hotel account does not exist.` });

        // TODO: Deleting profile logic - delete all bookings, offers, and reviews

        try{
            const deleteResult = await hdb`
                DELETE FROM hotels WHERE email = ${email};
                DELETE FROM verification_codes WHERE email = ${email};
            `;
        } catch(err){
            return res.status(400).json({ error: `Could not delete your hotel profile, please contact Hela Support.` });
        };
        
        return res.status(200).json({ message: `Successfully deleted your hotel profile.` });
    });

}