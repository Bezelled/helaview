import { AccountType } from './server/config/globals.js';

declare module 'jsonwebtoken' {
    export interface HelaJWTPayload extends JwtPayload {
        accountType: AccountType
    }
}

interface HelaEmail{
    readonly recipient: string;
    readonly subject: string;
    readonly text: string;
    readonly html: string;
}

interface HelaBooking{
    readonly id: number;
    readonly touristEmail: string;
    readonly hotelId: number;
    readonly hotelEmail: string;
    readonly checkIn: Date;
    readonly checkOut: Date;
    readonly numOfAdults: number;
    readonly numOfChildren: number;
    readonly numOfBabies: number;
    readonly numOfRooms: number;
    readonly numOfNights: number;
    readonly pricePerNight: number;
    readonly price: number;
}