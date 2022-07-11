'use strict';

import { Request, Response, NextFunction } from 'express';

//Log stuff here


export function logRequests(request: Request, response: Response, next: NextFunction) {
    console.log(`${request.method} url:: ${request.url}`);
    next();
}