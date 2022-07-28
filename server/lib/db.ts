'use strict';

import postgres, { Sql } from 'postgres';
import { DB_URL } from '../config/globals.js';

const hdb: Sql<{
    bigint: bigint;
}> = postgres(
    DB_URL,                 //our database connection string
    {
        types: {
            bigint: postgres.BigInt, //for bigint support
        }
    }
);

export default hdb;