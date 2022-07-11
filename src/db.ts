'use strict';

import postgres from 'postgres';

const DB_URL: string = process.env.DB_URL || ' ';

const helaDB = postgres(DB_URL);

export const HDB = helaDB;