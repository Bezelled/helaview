'use strict';

import { Router, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { userLoginKeys } from '../../config/globals.js';
import hdb from '../../lib/db.js';
import { validatePostData } from '../../lib/shared.js';
import { authenticateJWT } from 'server/middleware/auth.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/logout', authenticateJWT, async(req: Request, res: Response) => {
        //  TODO: logout
        return res.status(200).json({ message: 'Successfully logged out.' });
    });
}