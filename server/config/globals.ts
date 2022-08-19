'use strict';

import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { platform } from 'os';
import { Request } from 'express';
import multer, { diskStorage, StorageEngine, FileFilterCallback  } from 'multer';
import { randomUUID } from 'crypto';

dotenv.config();    //To load our .env file for environmental variables

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

// Environmental variables
export const DB_URL: string = process.env.HELA_DB_URL || '';
export const PORT: number = Number(process.env.HELA_SERVER_PORT) || 7788;  //Use the port environmental variable, or 7788 if it is undefined
export const DOMAIN: string = process.env.NODE_ENV === 'production' ? 'https://helaview.lk' : 'http://127.0.0.1:7788';
export const MAIL_SERVICE: string = process.env.MAIL_SERVICE || '';
export const MAIL_USERNAME: string = process.env.MAIL_USERNAME || '';
export const MAIL_PASSWORD: string = process.env.MAIL_PASSWORD || '';
export const JWT_SECRET: string = process.env.JWT_SECRET || '';

// Constants
const __filename: string = fileURLToPath(import.meta.url);
export const dirname: string = __filename.substring(0, __filename.lastIndexOf('\\server'));
export const helaPlatform: string = platform();
export const saltRounds: number = 10;
export const threeDays: number = 30 * 24 * 60 * 60 * 1000;
export const userRegistrationKeys: string[] = ['first name', 'last name', 'email', 'password', 'password confirmation', 'passport number', 'gender', 'age', 'country', 'contact number'];
export const hotelRegistrationKeys: string[] = ['email', 'full name', 'contact number', 'password', 'password confirmation', 'address', 'district', 'adult price', 'child price', 'baby price', 'room count', 'rating', 'hotel type'];
export const userLoginKeys: string[] = ['email', 'password'];
export const districts = ['Colombo', 'Gampaha', 'Kalutara', 'Kandy', 'Matale', 'Nuwara Eliya', 'Galle', 'Hambantota', 'Matara', 'Kurunegala', 'Puttalam', 'Batticaloa', 'Trincomalee', 'Ampara', 'Ratnapura', 'Kegalle', 'Anuradhapura', 'Polonnaruwa', 'Jaffna', 'Mullaitivu', 'Vavuniya', 'Kilinochchi', 'Mannar', 'Badulla', 'Monaragala'];
const fileStorage: StorageEngine = diskStorage({
    destination: (
        req: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        callback(null, './uploads/');
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, `${randomUUID()}_${file.originalname}`);
    }
});
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    
    switch (file.mimetype){
        case 'image/png':
        case 'image/jpg':
        case 'image/jpeg':
            callback(null, true);
            break;
        default:
            callback(null, false);
    };
};
const fileLimits: {
    fileSize: number;
} = { fileSize: 1 * 1000 * 1000 };
export const mult = multer({ storage: fileStorage, limits: fileLimits, fileFilter: fileFilter });

//Regular expressions

//TODO: Fix passportRegExp and addressRegExp
export const emailRegExp: RegExp = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/); 
export const passwordRegExp: RegExp = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$');
export const passportRegExp: RegExp = new RegExp('^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$'); 
export const addressRegExp: RegExp = new RegExp('/^[a-zA-Z0-9\s,.'-]{3,}$/ . '); //eslint-disable-line no-useless-escape

//Enums
export enum AccountType {
    Tourist = 0,
    Hotel = 1,
    Admin = 3
}