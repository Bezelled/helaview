'use strict';

import express, { Application } from 'express';
import { join } from 'path';
import routes from './server/routes.js';
import login from './server/api/tourists/login.js';
import register from './server/api/tourists/register.js';
import { PORT, dirname } from './server/config/globals.js';
import logger from './server/middleware/log.js';
import onlyAllowPosts from './server/middleware/methods.js';

// import { hdb } from './src/db.js';

const app: Application = express();

app.use(express.json(), express.urlencoded({ extended: false }), express.static(join(dirname, '../client/build')));
app.disable('x-powered-by');

//Default routes + handlers
app.use('/', routes, logger);

//API routes + handlers
app.use('/api/', login, register, onlyAllowPosts);

app.listen(PORT, () => {
    console.log(`🌍 HelaView web server is listening on port ${PORT}.`);
});