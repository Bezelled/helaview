'use strict';

import { Request, Response } from 'express';

/**
 * @param {Request} req
 *  The express request.
 * @param {Response} res
 *  The express response.
 * @param {string[]} keys
 *  The string array of keys to cross-check fields with.
 * @returns {boolean}
 *  An indicator of whether to proceed handling the request or not.
 */
export function validatePostData(req: Request, res: Response, keys: string[]): boolean{
    console.log(`[Received]: ${JSON.stringify(req.body)}.`);
    
    const reqKeys: string[] = Object.keys(req.body);
    
    if (reqKeys.length === 0){
        res.status(400).send({ error: 'POST data cannot be empty.' });
        return false;
    };

    for (const key of reqKeys)
    {
        if (!(keys.includes(key))){
            res.status(400).send({ error: `Invalid field: ${key}.` });
            return false;
        };
        
        if ((req.body[key] === undefined || req.body[key] === null)){
            res.status(400).send({ error: `Please fill out the ${key} field.` });
            return false;
        };
    };

    return true;
}