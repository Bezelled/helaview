'use strict';

import { Request, Response, Router } from 'express';
const routes = Router();

// name citext not null,
// password citext not null,
// address citext not null unique, 
// email citext not null unique,
// contact_no bigint not null unique,
// hotel_type citext not null,
// rating float(2)


routes.post('/register', (req: Request, res: Response) => {
    res.send('Welcome to HelaView API - register!');
});

export const register = routes;