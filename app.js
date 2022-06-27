'use strict';

const express = require('express');
const router = require('./src/routes');
const PORT = require('./src/const').PORT;
const hdb = require('./src/db').hdb;

const app = express();

app.use('/', router);

app.listen(PORT, () => {
    console.log(`HelaView app is listening on port ${PORT}.`);
});