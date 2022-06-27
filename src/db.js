'use strict'

const postgres = require('postgres');
const DB_URL = process.env.DB_URL;
console.log(DB_URL);

const hdb = postgres(DB_URL);

exports.hdb = hdb;