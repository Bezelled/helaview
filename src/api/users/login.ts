'use strict';

import { Router, Request, Response } from 'express';
import { userLoginKeys } from '../../config/globals.js';
import { validatePostData } from '../../lib/shared.js';

const routes: Router = Router();

routes.post('/users/login', async (req: Request, res: Response) => {
    const proceed: boolean = validatePostData(req, res, userLoginKeys);
    
    if (proceed === false)
        return;

    res.send("Welcome to HelaView's API - login!");
});

const login: Router = routes;
export default login;