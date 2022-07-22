'use strict';

import { Request, Response, NextFunction } from 'express';

//Log stuff here

export default function logger(request: Request, response: Response, next: NextFunction) {
    console.log(`[${request.method} | ${request.ip}:${request.socket.remotePort}] : ${request.url}`);
    
    next();
}