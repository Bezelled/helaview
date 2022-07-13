'use strict';

import { Router } from 'express';
const routes = Router();

routes.post('/users/register', (req, res) => {
    console.log(req.body);
    res.send('Welcome to HelaView API - register!');
});

export const register = routes;