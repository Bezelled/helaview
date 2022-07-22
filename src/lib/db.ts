'use strict';

import postgres from 'postgres';
import { DB_URL } from '../config/globals.js';

const hdb = postgres(
    DB_URL,                 //our database connection string
    {
        types: {
            bigint: postgres.BigInt, //for bigint support
        }
    }
);



export default hdb;