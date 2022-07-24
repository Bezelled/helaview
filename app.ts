'use strict';

import express, { Application } from 'express';
import routes from './server/routes.js';
import login from './server/api/users/login.js';
import register from './server/api/users/register.js';
import { PORT } from './server/config/globals.js';
import logger from './server/middleware/log.js';
import onlyAllowPosts from './server/middleware/methods.js';

// import { hdb } from './src/db.js';

//TODO: Live reloading of routes without shutting app down

const app: Application = express();

app.use(express.json(), express.urlencoded({ extended: false }));
app.disable('x-powered-by');

//Default routes + handlers
app.use('/', routes, logger);

//API routes + handlers
app.use('/api/', login, register, onlyAllowPosts);

app.listen(PORT, () => {
    console.log(`🌍 BetterAQW web server is listening on port ${PORT}.`);
});