'use strict';

import { Request, Response, Router } from 'express';
// import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/tourists/template', async(req: Request, res: Response) => {

        console.log(req);
        return res.status(200).json({message: 'Hi'});
    });
}