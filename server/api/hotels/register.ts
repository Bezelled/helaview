'use strict';

import { Request, Response, Router } from 'express';
import { hash } from 'bcrypt';
import { hotelRegistrationKeys, emailRegExp, passwordRegExp, saltRounds, AccountType } from '../../config/globals.js';
import { validatePostData, generateVerificationCode } from '../../lib/shared.js';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/hotels/register', async(req: Request, res: Response) => {

        const proceed: boolean = validatePostData(req, res, hotelRegistrationKeys);
        
        if (proceed === false)
            return;
    
        //Validate email
    
        const email: string = req.body.email;
    
        if (!(emailRegExp.test(email)))
            return res.status(400).json({ error: `Please enter a valid e-mail address.` });
    
        const exists = await hdb`
            SELECT true FROM hotels where email = ${email};
        `;  //check if e-mail exists
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exists === undefined)
            return res.status(400).json({ error: `An account under that e-mail address already exists.` });
    
        // Validate names
    
        const fullName: string = req.body['full name'];
    
        // TODO: strip out illegal characters
    
        //Validate password
    
        const password: string = req.body.password;
        const passwordConfirmation: string = req.body['password confirmation'];
    
        if (password !== passwordConfirmation)
            return res.status(400).json({ error: `Passwords must match.` });
    
        if (!(passwordRegExp.test(password)))
            return res.status(400).json({ error: `Please enter a valid, 8 to 20 character length password, consisting of upper & lower case alphanumeric and special characters.` });
    
        //Validate contact number
    
        let contactNo: number = req.body['contact number'];   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        if (isNaN(contactNo) || ((contactNo.toString().length) !== 9)){
            return res.status(400).json({ error: `Please enter a valid phone number.` });
        } else {
            contactNo = Number(contactNo);
        };

        //Validate room count
    
        const roomCount: number = Number(req.body['room count']);   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        if (isNaN(roomCount) || ((roomCount > 0) && (roomCount < 5000)))
            return res.status(400).json({ error: `Please enter a valid available room count.` });
    
        const address: string = req.body.address;
        const hotelType: string = req.body['hotel type'];

        //Validate rating

        const rating: number = Number(req.body.rating);   //eslint-disable-line @typescript-eslint/no-inferrable-types

        if (isNaN(rating) || ((rating >= 0)  && (rating <= 5)))
            return res.status(400).json({ error: `Please enter a valid hotel rating between 0.00 and 5.00. Select 0.00 to be classified as "unrated".` });
        
        // const images = {'Images': ['']};

        // Create password hash and insert to the database, if the password is valid

        try{
            
            hash(password, saltRounds, async(err: Error | unknown, hashedPassword: string) => {
                
                if (err !== undefined){
                    res.status(400).json({ error: `Please try another password.` });
                    throw err;
                };

                await hdb`
                    INSERT INTO users
                    (
                        email, hash, account_type
                    )
                    VALUES
                    (
                        ${email}, ${hashedPassword}, 'Hotel'
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
                
                await hdb`
                    INSERT INTO hotels
                    (
                        email, name, hash, address, contact_no, hotel_type, rating, available_rooms
                    )
                    VALUES
                    (
                        ${email}, ${fullName}, ${hashedPassword}, ${address}, ${contactNo}, ${hotelType}, ${rating}, ${roomCount}
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
            });

            await generateVerificationCode(hdb, email, AccountType.Hotel, 'Email');
    
            console.log(`[Hotel | Account created]: ${fullName}, ${email}, ${fullName}, ${passwordConfirmation}, ${address}, ${contactNo}, ${hotelType}, ${rating}, ${roomCount}.`);
            res.status(200).json({ message: `Your hotel account ${fullName} has been created under ${email}.`});
        } catch (err: Error | unknown){
            //Pass
        }
    });
}

// CREATE TABLE hotels
// (
//     id bigserial,
//     email citext PRIMARY KEY,
//     name citext NOT NULL,
//     hash citext NOT NULL,
//     address citext NOT NULL unique,
//     contact_no bigint NOT NULL unique,
//     hotel_type citext, -- Nullable at registration
//     rating float(2),  -- Nullable at registration
//     available_rooms smallint NOT NULL DEFAULT 1,
//     images jsonb NOT NULL DEFAULT '{"Images":[]}'::jsonb,
//     email_verified bool NOT NULL DEFAULT False,
//     admin_verified bool NOT NULL DEFAULT False
// );