'use strict';

import { Request, Response, NextFunction } from 'express';
//Use for method not allowed

export default function onlyAllowPosts(request: Request, response: Response, next: NextFunction) {
    
    if (request.method !== 'POST') {
        return response.status(401).send(`Method ${request.method} not allowed!`);
    };
    
    next();
}