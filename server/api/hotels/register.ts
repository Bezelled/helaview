'use strict';

import { Request, Response, Router } from 'express';
import { RowList } from 'postgres';
import { hash } from 'bcrypt';
import { parsePhoneNumber } from 'libphonenumber-js';
import { hotelRegistrationKeys, emailRegExp, passwordRegExp, saltRounds, AccountType, districts } from '../../config/globals.js';
import { validatePostData, generateVerificationCode } from '../../lib/shared.js';
import { HelaDBHotels } from 'index.js';
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
    
        const exists: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
            SELECT true FROM hotels where email = ${email};
        `;  //check if e-mail exists
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exists.length)
            return res.status(400).json({ error: `An account under that e-mail address already exists.` });
    
        // Validate name
    
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
    
        let contactNo: number | string = req.body['contact number'];   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        try{
            const phoneNumber = parsePhoneNumber(String(contactNo));
            contactNo = Number(phoneNumber.number);
        } catch (err){
            return res.status(400).json({ error: `Please enter a valid phone number with your country code. Ex: +94771002030 ` });
        };

        //Validate room count
    
        const roomCount: number = Number(req.body['room count']);   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        if (isNaN(roomCount) || ((roomCount < 1) && (roomCount > 5000)))
            return res.status(400).json({ error: `Please enter a valid available room count.` });
    
        //Validate address
        const address: string = req.body.address;
        const district: string = req.body.district;

        if (districts.indexOf(district) === -1)
            return res.status(400).json({ error: `Please select a valid Sri Lankan district.` });
        
        const hotelType: string = req.body['hotel type'];

        //Validate prices

        const adultPrice: number = req.body['adult price'];
        const childPrice: number = req.body['child price'];
        const babyPrice: number = req.body['baby price'];

        const prices: {
            'adult_price': number;
            'child_price': number;
            'baby_price': number;
        } = {
            'adult_price': adultPrice,
            'child_price': childPrice,
            'baby_price': babyPrice
        };

        for (const price in prices){

            if (prices[price as keyof typeof prices] < 1 || prices[price as keyof typeof prices] > 5000)
                return res.status(400).json({ error: `Please enter a valid nightly price in US Dollars, between $1 and $5000.` });
        };

        //Validate rating

        const rating: number = Number(req.body.rating);   //eslint-disable-line @typescript-eslint/no-inferrable-types

        if (rating !== 0.00){

            if (!(rating > 1 && rating < 5) && (rating % 0.25 === 0))
                return res.status(400).json({ error: `Please enter a valid hotel rating between 1.00 and 5.00. Select 0.00 to be classified as "unrated".` });
        };
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
                        email, hash, contact_no, account_type
                    )
                    VALUES
                    (
                        ${email}, ${hashedPassword}, ${contactNo}, 'Hotel'
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;

                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                await hdb`
                    INSERT INTO hotels
                    (
                        email, name, hash, address, district, contact_no, hotel_type, rating, available_rooms, prices
                    )
                    VALUES
                    (
                        ${email}, ${fullName}, ${hashedPassword}, ${address}, ${district}, ${contactNo}, ${hotelType}, ${rating}, ${roomCount}, ${prices}::jsonb
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
            });

            await generateVerificationCode(hdb, email, AccountType.Hotel, 'Email');
    
            console.log(`[Hotel | Account created]: ${fullName}, ${email}, ${fullName}, ${passwordConfirmation}, ${address}, ${contactNo}, ${hotelType}, ${rating}, ${roomCount}.`);
            res.status(200).json({ message: `Your hotel account ${fullName} has been created under ${email}.`});
        } catch (err: Error | unknown){
            res.status(400).json({ error: `Could not create a HelaView hotel account under ${email}.`});
        }
    });
}