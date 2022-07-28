'use strict';

import { Request, Response, Router } from 'express';
import { hash } from 'bcrypt';
import { userRegistrationKeys, emailRegExp, passwordRegExp, passportRegExp, addressRegExp, saltRounds, AccountType } from '../../config/globals.js';
import { validatePostData, generateVerificationCode } from '../../lib/shared.js';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.post('/tourists/register', async(req: Request, res: Response) => {

        const proceed: boolean = validatePostData(req, res, userRegistrationKeys);
        
        if (proceed === false)
            return;
    
        //Validate email
    
        const email: string = req.body.email;
    
        if (!(emailRegExp.test(email)))
            return res.status(400).send({ error: `Please enter a valid e-mail address.` });
    
        const exists = await hdb`
            SELECT true FROM tourists where email = ${email};
        `;  //check if e-mail exists
    
        //TODO: Find out the actual type of exists
    
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (exists === true)
            return res.status(400).send({ error: `An account under that e-mail address already exists.` });
    
        // Validate names
    
        const firstName: string = req.body['first name'];
        const lastName: string = req.body['last name'];
    
        // TODO: username validation with database, and strip out illegal characters
    
        //Validate password
    
        const password: string = req.body.password;
        const passwordConfirmation: string = req.body['password confirmation'];
    
        if (password !== passwordConfirmation)
            return res.status(400).send({ error: `Passwords must match.` });
    
        if (!(passwordRegExp.test(password)))
            return res.status(400).send({ error: `Please enter a valid, 8 to 20 character length password, consisting of upper & lower case alphanumeric and special characters.` });
    
        // Create password hash, if the password is valid
        
        let hashedPassword: string = '';    // eslint-disable-line @typescript-eslint/no-inferrable-types
        
        hash(password, saltRounds, function(err: Error | undefined, hash: string) {
            
            if (err !== undefined)
                return res.status(400).send({ error: `Please try another password.` });
            
            hashedPassword = hash;
        });
    
        //Validate gender
    
        if (['M', 'F'].indexOf(req.body.gender) === -1)
            return res.status(400).send({ error: `Please select a valid gender: 'M' or 'F'.` });
            
        const gender: boolean = (req.body.gender === 'M');
    
        //Validate age
        
        const age: number = req.body.age;
    
        if ((Number.isNaN(age) || (age < 0) || (age > 100)))
            return res.status(400).send({ error: `Please input a valid age.` });
    
        if (age <  13)
            return res.status(400).send({ error: `You need to be at least 13 years old to have an account.` });
    
        //Validate contact number
    
        const contactNo: number = Number(req.body['contact number']);   //eslint-disable-line @typescript-eslint/no-inferrable-types
    
        if ((Number.isNaN(contactNo) || (contactNo.toString().length) > 10))
            return res.status(400).send({ error: `Please enter a valid phone number.` });
    
        //Validate passport number

        const passportNo: string = req.body['passport number'];
    
        if (!(passportRegExp.test(passportNo)))
            return res.status(400).send({ error: `Please enter a valid passport number.` });
    
        //Validate address
    
        const address: string = req.body.address;
    
        if (!(addressRegExp.test(address)))
            return res.status(400).send({ error: `Please enter a valid address.` });
    
        const country = req.body.country;
    
        await hdb`
            INSERT INTO tourists
            (
                first_name, last_name, email, hash, passport_no, age, gender, country, address, contact_no
            )
            VALUES
            (
                ${firstName}, ${lastName}, ${email}, ${hashedPassword}, ${passportNo}, ${age}, ${gender}, ${country}, ${address}, ${contactNo}
            )
            ON CONFLICT (email) DO NOTHING;
        `;

        await generateVerificationCode(hdb, email, AccountType.Tourist);
    
        console.log(`[Account created]: ${firstName}, ${lastName}, ${gender}, ${email}, ${password}, ${passwordConfirmation}, ${passportNo}, ${age}, ${address}, ${contactNo}.`);
        return res.status(200).send({ success: `Your account ${firstName} has been created.`});
    });
}