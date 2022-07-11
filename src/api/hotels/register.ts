'use strict';

import { Request, Response, Router } from 'express';
const routes = Router();

routes.post('/register', (req: Request, res: Response) => {
    res.send('Welcome to HelaView API - register!');
});

export const register = routes;