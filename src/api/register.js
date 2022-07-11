'use strict';

import { Router } from 'express';
const routes = Router();

routes.post('/register', (req, res) => {
    res.send('Welcome to HelaView API - login!')
});

export const login = routes;