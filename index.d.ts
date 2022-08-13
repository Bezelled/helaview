import { AccountType } from './server/config/globals.js';

declare module 'jsonwebtoken' {
    export interface HelaJWTPayload extends JwtPayload {
        accountType: AccountType
    }
}

interface HelaEmail{
    recipient: string;
    subject: string;
    text: string;
    html: string;
}