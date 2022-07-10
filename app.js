'use strict';

const express = require('express');
const router = require('./src/routes').router;
const port = require('./src/config/globals').PORT;
const hdb = require('./src/db').hdb;

const app = express();

app.use('/', router);

app.listen(port, () => {
    console.log(`HelaView app is listening on port ${port}.`);
});