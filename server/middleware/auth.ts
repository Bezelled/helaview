'use strict';

import { Request, Response, NextFunction } from 'express';
import { HelaJWTPayload, verify } from 'jsonwebtoken';
import { AccountType, JWT_SECRET } from 'server/config/globals';

//Authenticate users

/**
 * Middleware to check whether user has access to a specific endpoint
 * 
 * @param accountType the account type that can access that endpoint
 */
export default async function authenticateJWT(accountType: AccountType): Promise<(request: Request, response: Response, next: NextFunction) => void> {
    return async (request: Request, response: Response, next: NextFunction) => {
        try {
            const authHeader: string | undefined = request.headers['authorization'];
            const token: string | undefined = authHeader && authHeader.split(' ')[1];
            
            if (token == null)
                return response.sendStatus(401);

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