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
export const authenticateJWT = (accountType: AccountType) => {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const authHeader: string | undefined = request.headers['authorization'];
            const token: string | undefined = authHeader && authHeader.split(' ')[1];
            
            if (token == null)
                return response.status(401).json({ error: 'Unauthorized access. Please login and re-try.' });

            const { clientAccountType } = <HelaJWTPayload>verify(token, JWT_SECRET);
            const hasAccess: boolean = clientAccountType === accountType;

            if (hasAccess === false)
                return response.status(401).json({ error: 'You do not have enough access to complete this action.' });

            next();
        } catch (error: any) {
            
            if (error.name === 'TokenExpiredError')
                return response.status(401).json({ error: 'Expired token.' });

            response.status(500).json({ error: 'Failed to authenticate user.' });
        };
    };
};