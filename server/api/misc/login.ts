'use strict';

import { Router, Request, Response } from 'express';
import { compare } from 'bcrypt';
import { AccountType, userLoginKeys } from '../../config/globals.js';
import hdb from '../../lib/db.js';
import { generateJWT, getAccountType, validatePostData } from '../../lib/shared.js';
import { RowList } from 'postgres';
import { HelaDBAdmins, HelaDBHotels, HelaDBTourists, HelaDBUsers } from 'index.js';

export default async function addRoute(router: Router): Promise<void>{

    router.post('/login', async (req: Request, res: Response) => {
        const proceed: boolean = validatePostData(req, res, userLoginKeys);
        
        if (proceed === false)
            return;
    
        const email: string = req.body.email;
        
        const accountDetails: RowList<HelaDBUsers[]> = await hdb<HelaDBUsers[]>`
            SELECT hash, account_type, active FROM users WHERE email = ${email};
        `;
    
        if (!accountDetails.length)
            return res.status(400).json({ error: `That account does not exist. Please consider registering beforehand.` });
        
        const active: boolean = accountDetails[0].active;
        
        if (!active)
            return res.status(400).json({ error: `That account is banned. Please contact HelaView Support to reinstate it.` });
        
        const password: string = req.body.password;
        const hash: string = accountDetails[0].hash;
        const valid: boolean = await compare(password, String(hash));
        
        if (valid === true){
            const accountType: string = accountDetails[0].account_type;
            const helaAccountType: AccountType = getAccountType(accountType);
            let id: number = 0;
            
            switch (helaAccountType){
                
                case AccountType.Tourist:
                    // eslint-disable-next-line no-case-declarations
                    const touristDetails: RowList<HelaDBTourists[]> = await hdb<HelaDBTourists[]>`
                        SELECT id FROM tourists WHERE email = ${email};`
                    ;
                    
                    if (!touristDetails.length)
                        return res.status(400).json({ error: `That tourist account does not exist. Please consider registering beforehand.` });
                    
                    id = Number(touristDetails[0].id);
                    break;
                
                case AccountType.Hotel:
                    // eslint-disable-next-line no-case-declarations
                    const hotelDetails: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                        SELECT id FROM hotels WHERE email = ${email};`
                    ;
                    
                    if (!hotelDetails.length)
                        return res.status(400).json({ error: `That hotel account does not exist. Please consider registering beforehand.` });
                    
                    id = Number(hotelDetails[0].id);
                    break;
                
                case AccountType.Admin:
                    // eslint-disable-next-line no-case-declarations
                    const adminDetails: RowList<HelaDBAdmins[]> = await hdb<HelaDBAdmins[]>`
                        SELECT id FROM admins WHERE email = ${email};`
                    ;
                    
                    if (!adminDetails.length)
                        return res.status(400).json({ error: `That admin account does not exist. Please consider registering beforehand.` });
                    
                    id = Number(adminDetails[0].id);
                    break;
            }
            const JWT: string = generateJWT({
                userID: id,
                accountType: getAccountType(accountType)
            });
            console.log(`${email} | ${accountType} has successfully logged in.`);   //redirect to relevant account type page
            return res.status(200).json({
                message: `${email} has successfully logged in.`,
                token: JWT,
                accountType: helaAccountType
            });
        } else {
            console.log(`${email} has not logged in.`);
            return res.status(400).json({ error: `Invalid password.` });
        }
    });
}