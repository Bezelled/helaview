import { HelaJWTPayload } from 'jsonwebtoken';
import { AccountType } from './server/config/globals.js';

declare module 'jsonwebtoken'{
    export interface HelaJWTPayload extends JwtPayload{
        userID: number;
        accountType: AccountType;
    }
}

declare global{
    namespace Express{
        interface Request{
            user: HelaJWTPayload;
        }
    }
}

interface HelaEmail
{
    readonly recipient: string;
    readonly subject: string;
    readonly text: string;
    readonly html: string;
}

interface HelaBooking
{
    readonly id: bigint;
    readonly touristEmail: string;
    readonly hotelId?: bigint;
    readonly hotelEmail?: string;
    readonly hotelName: string;
    readonly checkIn: Date;
    readonly checkOut: Date;
    readonly numOfAdults: number;
    readonly numOfChildren: number;
    readonly numOfBabies: number;
    readonly numOfRooms: number;
    readonly numOfNights?: number;
    readonly price: number;
    readonly pricePerNight?: number;
    readonly offerCode: string | null;
}

//Database table types for SQL query return type casting

interface HelaDBUsers
{
    email: string;
    hash: string;
    contact_no: number;
    account_type: string;
    active: boolean;
}

interface HelaDBTourists
{
    id: bigint;
    email: string;
    first_name: string;
    last_name: string;
    hash: string;
    passport_no: string; 
    age: number;
    gender: boolean;
    country: string;
    contact_no: number;
    images: object;
    email_verified: boolean;
    admin_flagged: boolean;
}

interface HelaDBHotels
{
    id: bigint;
    email: string;
    name: string;
    hash: string;
    address: string;
    district: string;
    contact_no: number;
    hotel_type: string;
    rating: number;
    available_rooms: number;
    prices: object;
    images: object;
    email_verified: boolean;
    admin_verified: boolean;
}

interface HelaDBVerificationCodes
{
    email: string;
    code: string;
    type: string;
    expired: boolean;
    date_created: Date;
}

interface HelaDBReviews
{
    id: bigint;
    hotel_id: bigint;
    tourist_id: bigint;
    rating: number;
    review: string;
    date_created: Date;
}

interface HelaDBOffers
{
    id: bigint;
    code: string;
    name: string;
    description: string;
    expired: boolean;
    start_date: Date;
    end_date: Date;
    hotels: object;
}

interface HelaDBBooking
{
    start_date: any;
    id: bigint;
    price: number;
    price_per_night: number;
    num_of_nights: number;
    num_of_rooms: number;
    head_count: object;
    tourist_id: bigint;
    tourist_email: string;
    hotel_id: bigint;
    hotel_email: string;
    offer_code: string;
    check_in_date: Date;
    check_out_date: Date;
    creation_date: Date;
}

interface HelaDBAdmins
{
    id: bigint;
    email: string;
    name: string;
    hash: string;
    images: object;
}

interface HelaDBTouristLogs
{
    description: string;
    tourist_id: bigint;
    admin_id: bigint;
}

interface HelaDBHotelLogs
{
    description: string;
    hotel_id: bigint;
    admin_id: bigint;
}