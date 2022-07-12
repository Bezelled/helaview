'use strict';

import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
    res.sendFile('/resources/index.html', { root: '.' });
    // res.send('Welcome to HelaView!');
});

export const router = routes;