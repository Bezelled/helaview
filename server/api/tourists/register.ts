'use strict';

import { Request, Response, Router } from 'express';
import { hash } from 'bcrypt';
import { userRegistrationKeys, emailRegExp, passwordRegExp, saltRounds, AccountType, countryNames } from '../../config/globals.js';
import { validatePostData, generateVerificationCode } from '../../lib/shared.js';
import hdb from '../../lib/db.js';
import { parsePhoneNumber } from 'libphonenumber-js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/tourists/register', async(req: Request, res: Response) => {

        const proceed: boolean = validatePostData(req, res, userRegistrationKeys);
        
        if (proceed === false)
            return;
    
        //Validate email
    
        const email: string = req.body.email;
    
        if (!(emailRegExp.test(email)))
            return res.status(400).json({ error: `Please enter a valid e-mail address.` });
    
        const exists = await hdb`
            SELECT true FROM tourists where email = ${email};
        `;  //check if e-mail exists
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exists === undefined)
            return res.status(400).json({ error: `An account under that e-mail address already exists.` });
    
        // Validate names
    
        const firstName: string = req.body['first name'];
        const lastName: string = req.body['last name'];
    
        // TODO: strip out illegal characters
    
        //Validate password
    
        const password: string = req.body.password;
        const passwordConfirmation: string = req.body['password confirmation'];
    
        if (password !== passwordConfirmation)
            return res.status(400).json({ error: `Passwords must match.` });
    
        if (!(passwordRegExp.test(password)))
            return res.status(400).json({ error: `Please enter a valid, 8 to 20 character length password, consisting of upper & lower case alphanumeric and special characters.` });
    
        //Validate gender
    
        if (['M', 'F'].indexOf(req.body.gender) === -1)
            return res.status(400).json({ error: `Please select a valid gender: Male or Female.` });
            
        const gender: boolean = (req.body.gender === 'M');
    
        //Validate age
        
        const age: number = req.body.age;
    
        if ((isNaN(age) || (age < 0) || (age > 120)))
            return res.status(400).json({ error: `Please input a valid age.` });
    
        if (age <  13)
            return res.status(400).json({ error: `You need to be at least 13 years old to have an account.` });
    
        //Validate contact number
    
        let contactNo: number | string = req.body['contact number'];   //eslint-disable-line @typescript-eslint/no-inferrable-types
        
        try{
            const phoneNumber = parsePhoneNumber(String(contactNo));
            contactNo = Number(phoneNumber.number);
        } catch (err){
            return res.status(400).json({ error: `Please enter a valid phone number with your country code. Ex: +94771002030 ` });
        };

        const passportNo: string = req.body['passport number'];

        //Validate country
    
        const country = req.body.country;

        if (countryNames.indexOf((country)) === -1)
            return res.status(400).json({ error: `Please select a valid country from the list.` });

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
                        ${email}, ${hashedPassword}, ${contactNo}, 'Tourist'
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
                
                await hdb`
                    INSERT INTO tourists
                    (
                        email, first_name, last_name, hash, passport_no, age, gender, country, contact_no
                    )
                    VALUES
                    (
                        ${email}, ${firstName}, ${lastName}, ${hashedPassword}, ${passportNo}, ${age}, ${gender}, ${country}, ${contactNo}
                    )
                    ON CONFLICT (email) DO NOTHING;
                `;
            });

            await generateVerificationCode(hdb, email, AccountType.Tourist, 'Email');
    
            console.log(`[Tourist | Account created]: ${email}, ${firstName}, ${lastName}, ${password}, ${passportNo}, ${age}, ${gender}, ${country}, ${contactNo}.`);
            res.status(200).json({ message: `Your tourist account ${firstName} has been created under ${email}.`});
        } catch (err: Error | unknown){
            //Pass
        }
    });
}