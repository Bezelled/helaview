'use strict';

import { Router } from 'express';

const routes: Router = Router();

routes.post('/users/register', (req, res) => {
    console.log(req.body);
    
    if (Object.keys(req.body).length === 0){
        return res.status(400).send({ message: 'POST data cannot be empty.' });
    };

    res.send('Welcome to HelaView API - register!');
});

export const register = routes;