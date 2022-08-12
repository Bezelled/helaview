'use strict';

import { Request, Response, Router } from 'express';
import { verifyAccount } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { AccountType } from '../../config/globals.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/verify/email/:email/:token', async(req: Request, res: Response) => {

        await verifyAccount(hdb, req, res, AccountType.Hotel);
    });

    router.post('/hotels/verify/id/:id/:token', async(req: Request, res: Response) => {
        
        if (Number.isNaN(req.params.id))
            return res.status(400).json({error: 'Please enter a valid hotel ID.'});

        const hotelID: number = Number(req.params.id);
        const adminToken: string = req.params.token;

        await verifyAccount(hdb, req, res, AccountType.Hotel);
    });
}