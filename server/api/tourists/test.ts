'use strict';

import { Router, Request, Response } from 'express';

export default async function addRoute(router: Router): Promise<void>{

    router.get('/tourists/test', async (req: Request, res: Response) => {
        return res.status(200).send({ message: `Successful test.` });
    });
}