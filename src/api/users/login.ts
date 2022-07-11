'use strict';

import { Router } from 'express';
const routes = Router();

routes.get('/login', (req, res) => {
    res.send("Welcome to HelaView's API - login!");
});

export const login = routes;