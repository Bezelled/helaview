'use strict'

import postgres from 'postgres';

const DB_URL = process.env.DB_URL;
console.log(DB_URL);

const helaDB = postgres(DB_URL);

export const HDB = helaDB;