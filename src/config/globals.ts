'use strict';

import dotenv from 'dotenv';

dotenv.config();    //To load our .env file for environmental variables

// Environmental variables
export const DB_URL: string = process.env.HELA_DB_URL || '';
export const PORT: number = Number(process.env.PORT) || 80;  //Use the port environmental variable, or 8080 if it is undefined

// Constants
export const saltRounds: number = 10;
export const userRegistrationKeys: string[] = ['first name', 'last name', 'email', 'password', 'password confirmation', 'passport number', 'gender', 'age', 'country', 'address', 'contact number'];
export const hotelRegistrationKeys: string[] = ['full name', 'password', 'email', 'address', 'contact number', 'hotel type', 'rating'];
export const userLoginKeys: string[] =['email', 'password'];

//Regular expressions

//TODO: Fix passportRegExp and addressRegExp
export const emailRegExp: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); 
export const passwordRegExp: RegExp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$');
export const passportRegExp: RegExp = new RegExp('^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$'); 
export const addressRegExp: RegExp = new RegExp("/^[a-zA-Z0-9\s,.'-]{3,}$/ . "); //eslint-disable-line no-useless-escape