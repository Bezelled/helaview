'use strict';

import express, { Application } from 'express';
import routes from './src/routes.js';
import login from './src/api/users/login.js';
import register from './src/api/users/register.js';
import { PORT } from './src/config/globals.js';
import logger from './src/middleware/log.js';
import onlyAllowPosts from './src/middleware/methods.js';

// import { hdb } from './src/db.js';

//TODO: Live reloading of routes without shutting app down

const app: Application = express();

app.use(express.json(), express.urlencoded({ extended: false }));

//Default routes + handlers
app.use('/', routes, logger);

//API routes + handlers
app.use('/api/', login, register, onlyAllowPosts);

app.listen(PORT, () => {
    console.log(`🌍 BetterAQW web server is listening on port ${PORT}.`);
});