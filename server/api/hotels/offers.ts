'use strict';

import { Router, Request, Response } from 'express';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/hotels/offers', (req: Request, res: Response) => {
        res.send('Thank you for adding an offer!');
    });

}