'use strict';

import { Request, Response, Router } from 'express';
import { hash } from 'bcrypt';
import { hotelRegistrationKeys, emailRegExp, passwordRegExp, saltRounds, AccountType } from '../../config/globals.js';
import { validatePostData, generateVerificationCode } from '../../lib/shared.js';
import hdb from '../../lib/db.js';

// export const hotelRegistrationKeys: string[] = ['full name', 'password', 'password confirmation', 'email', 'address', 'contact number', 'hotel type', 'rating'];

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/hotels/register', async(req: Request, res: Response) => {

        const proceed: boolean = validatePostData(req, res, hotelRegistrationKeys);
        
        if (proceed === false)
            return;
    
        //Validate email
    
        const email: string = req.body.email;
    
        if (!(emailRegExp.test(email)))
            return res.status(400).send({ error: `Please enter a valid e-mail address.` });
    
        const exists = await hdb`
            SELECT true FROM hotels where email = ${email};
        `;  //check if e-mail exists
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exists === undefined)
            return res.status(400).send({ error: `An account under that e-mail address already exists.` });
    
        // Validate names
    
        const fullName: string = req.body['full name'];
    
        // TODO: strip out illegal characters
    
        //Validate password
    
        const password: string = req.body.password;
        const passwordConfirmation: string = req.body['password confirmation'];
    
        if (password !== passwordConfirmation)
            return res.status(400).send({ error: `Passwords must match.` });
    
        if (!(passwordRegExp.test(password)))
            return res.status(400).send({ error: `Please enter a valid, 8 to 20 character length password, consisting of upper & lower case alphanumeric and special characters.` });
    
        //Validate contact number
    
        let contactNo: number = req.body['contact number'];   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        if (Number.isNaN(contactNo) || ((contactNo.toString().length) !== 9)){
            return res.status(400).send({ error: `Please enter a valid phone number.` });
        } else {
            contactNo = Number(contactNo);
        };
    
        const address: string = req.body.address;
        const hotelType: string = req.body['hotel type'];

        //Validate rating

        let rating: number | string | null = req.body.rating;   //eslint-disable-line @typescript-eslint/no-inferrable-types

        if (rating === 'Unrated'){
            rating = null;
        } else {
            
            if (Number.isNaN(rating) || (Number(rating) >= 0  && Number(rating) <= 5)){
                return res.status(400).send({ error: `Please enter a valid hotel rating between 0.00 and 5.00, or select 'Unrated'.` });
            } else {
                rating = Number(rating);
            };
        };

        // Create password hash and insert to the database, if the password is valid

        try{
            
            hash(password, saltRounds, async(err: Error | unknown, hashedPassword: string) => {
                
                if (err !== undefined){
                    res.status(400).send({ error: `Please try another password.` });
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
                        full_name, email, hash, address, contact_no, hotel_type, rating
                    )
                    VALUES
                    (
                        ${fullName}, ${email}, ${hashedPassword}, ${address}, ${contactNo}, ${hotelType}, ${rating}
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
            });

            await generateVerificationCode(hdb, email, AccountType.Hotel);
    
            console.log(`[Account created]: ${fullName}, ${email}, ${password}, ${passwordConfirmation}, ${address}, ${contactNo}.`);
            res.status(200).send({ success: `Your account ${fullName} has been created.`});
        } catch (err: Error | unknown){
            //Pass
        }
    });
}