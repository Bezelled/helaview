'use strict';

import { Router } from 'express';

const routes = Router();

routes.get('/', (req, res) => {
    res.send('Welcome to HelaView!')
});

export const router = routes;

// module.exports = {
//     router: routes
// };