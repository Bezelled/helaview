'use strict';

import { Request, Response, Router } from 'express';

//Hardcoded routes

export default async function addRoute(router: Router): Promise<void>{

    router.get('/', (req: Request, res: Response) => {
        res.sendFile('/client/build/index.html', { root: '.' });
        // res.send('Welcome to HelaView!');
    });

}