'use strict';

//for all users - only verified profiles

import { Request, Response, Router } from 'express';
// import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/hotels/profiles', async(req: Request, res: Response) => {

        console.log(req);
        return res.status(200).send({message: 'Hi'});
    });
}