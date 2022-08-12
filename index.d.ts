import { AccountType } from './server/config/globals.js';

declare module 'jsonwebtoken' {
    export interface HelaJWTPayload extends JwtPayload {
        accountType: AccountType
    }
}