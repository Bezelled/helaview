'use strict';

import { Request, Response, NextFunction } from 'express';
import { AccountType, JWT_SECRET } from '../config/globals.js';

import jwt, { HelaJWTPayload } from 'jsonwebtoken';

const { verify } = jwt;

//Authenticate users

/**
 * Middleware to check whether user has access to a specific endpoint
 * 
 * @param accountType the account type that can access that endpoint
 */
export const authenticateJWT = (allowedAccountTypes?: AccountType[]) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        
        try {
            const authHeader: string | undefined = request.headers['authorization'];
            const token: string | undefined = authHeader && authHeader.split(' ')[1];

            // If there is no JWT token
            
            if (!token)
                return response.status(401).json({ error: 'Unauthorized access. Please login and retry.' });

            verify(token, JWT_SECRET, (err, payload) => {

                // If authentication fails - expired JWT, etc...
                
                if (err)
                    return response.status(401).json({ error: 'Unauthorized access. Please relogin and retry.' });

                request.user = <HelaJWTPayload>payload;

                // If the route is restricted to certain account types

                if (allowedAccountTypes !== undefined)
                {
                    const accountType = request.user.accountType;
                    // If the user's account type is allowed to access this route
                    const hasAccess: boolean = (allowedAccountTypes.indexOf(accountType) !== -1);

                    if (hasAccess === false)
                        return response.status(403).json({ error: 'You do not have enough access to complete this action.' });
                };
                next();
            });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            if (error.name === 'TokenExpiredError')
                return response.status(401).json({ error: 'Expired token.' });

            return response.status(500).json({ error: 'Failed to authenticate user.' });
        };
    };
};