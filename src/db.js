'use strict'

const postgres = require('postgres');
const DB_URL = process.env.DB_URL;
console.log(DB_URL);

const helaDB = postgres(DB_URL);

module.exports = {
    hdb: helaDB
};