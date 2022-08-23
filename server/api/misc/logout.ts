'use strict';

import { Router, Request, Response } from 'express';
import { JWT_SECRET } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import jwt from 'jsonwebtoken';

const { sign } = jwt;

export default async function addRoute(router: Router): Promise<void>{

    router.post('/logout', authenticateJWT, async(req: Request, res: Response) => {
        const authHeader: string = String(req.headers['authorization']);
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        sign(authHeader, JWT_SECRET, { expiresIn: 1 } , (logout, err) => {
            
            if (logout){
                return res.status(200).json({ message: 'Successfully logged out.' });
            } else {
                return res.status(500).json({ error: 'Could not log you out.' });
            };
        });
    });
}