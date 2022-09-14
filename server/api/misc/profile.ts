'use strict';

import { Request, Response, Router } from 'express';
import { RowList } from 'postgres';
import { HelaDBAdmins, HelaDBHotels, HelaDBTourists } from 'index.js';
import { AccountType } from '../../config/globals.js';
import { authenticateJWT } from '../../middleware/auth.js';
import hdb from '../../lib/db.js';

export default async function addRoute(router: Router): Promise<void>{
    
    router.get('/profile/me',
        authenticateJWT,
        async(req: Request, res: Response) => {
            const { userID, accountType } = req.user;

            switch (accountType){
                
                case AccountType.Tourist:{
                    const touristAccount: RowList<HelaDBTourists[]> = await hdb<HelaDBTourists[]>`
                            SELECT
                                email,
                                first_name,
                                last_name,
                                age,
                                gender,
                                country,
                                contact_no,
                                email_verified
                            FROM tourists WHERE id = ${userID};
                    `;

                    if (!touristAccount.length)
                        return res.status(404).json({ error: 'Page not found.' });
                    
                    return res.status(200).json({
                        message: 'HelaView | Profile',
                        'user details':{
                            'first name': touristAccount[0].first_name,
                            'last name': touristAccount[0].last_name,
                            'age': touristAccount[0].age,
                            'gender': touristAccount[0].gender ? 'Male': 'Female',
                            'country': touristAccount[0].country,
                            'contact number': touristAccount[0].contact_no,
                            'verified': touristAccount[0].email_verified
                        }
                    });
                };

                case AccountType.Hotel:{
                    const hotelAccount: RowList<HelaDBHotels[]> = await hdb<HelaDBHotels[]>`
                            SELECT
                                email,
                                name,
                                address,
                                district, 
                                contact_no,
                                hotel_type,
                                rating,
                                available_rooms,
                                prices,
                                email_verified,
                                admin_verified
                            FROM hotels WHERE id = ${userID};
                    `;

                    if (!hotelAccount.length)
                        return res.status(404).json({ error: 'Page not found.' });
                    
                    return res.status(200).json({
                        message: 'HelaView | Hotel Profile',
                        'user details':{
                            'email': hotelAccount[0].email,
                            'full name': hotelAccount[0].name,
                            'address': hotelAccount[0].address,
                            'district': hotelAccount[0].district,
                            'contact no': hotelAccount[0].contact_no,
                            'hotel type': hotelAccount[0].hotel_type,
                            'rating': hotelAccount[0].rating,
                            'available rooms': hotelAccount[0].available_rooms,
                            'prices': hotelAccount[0].prices,
                            'email verified': hotelAccount[0].email_verified,
                            'admin verified': hotelAccount[0].admin_verified
                        }
                    });
                };

                case AccountType.Admin:{
                    const adminAccount: RowList<HelaDBAdmins[]> = await hdb<HelaDBAdmins[]>`
                            SELECT email, name FROM admins WHERE id = ${userID};
                    `;

                    if (!adminAccount.length)
                        return res.status(404).json({ error: 'Page not found.' });
                    
                    return res.status(200).json({
                        message: 'HelaView | Profile',
                        'user details':{
                            'email': adminAccount[0].email,
                            'full name': adminAccount[0].name
                        }
                    });
                };
            };
        }
    );
}