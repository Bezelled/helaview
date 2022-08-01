'use strict';

import { Request, Response, Router } from 'express';
import { verifyAccount } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { AccountType } from '../../config/globals.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/tourists/verify/:email/:token', async(req: Request, res: Response) => {

        await verifyAccount(hdb, req, res, AccountType.Tourist);
    });
}