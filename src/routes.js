'use strict';

const exp = require('express');
const routes = exp.Router();

routes.get('/', (req, res) => {
    res.send('Welcome to HelaView!')
});

module.exports = {
    router: routes
};