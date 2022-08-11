'use strict';

import { Router, Request, Response } from 'express';

// CREATE TABLE offers
// (
//     id bigserial,
//     code citext PRIMARY KEY,
//     name citext NOT NULL,
//     description citext NOT NULL,
//     start_date timestamp NOT NULL,
//     end_date timestamp,  -- Nullable at addition
//     hotels jsonb NOT NULL DEFAULT '[]'
// );

export default async function addRoute(router: Router): Promise<void>{

    router.post('/offers', (req: Request, res: Response) => {
        res.send('Thank you for adding an offer!');
    });

}