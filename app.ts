'use strict';

import express, { Application } from 'express';
import { join } from 'path';
import touristRouter from './server/api/tourists/routes.js';
import hotelRouter from './server/api/hotels/routes.js';
import adminRouter from './server/api/admins/routes.js';
import miscRouter from './server/api/misc/routes.js';
import { PORT, dirname } from './server/config/globals.js';
import logger from './server/middleware/log.js';
import onlyAllowPosts from './server/middleware/methods.js';
import cors from 'cors';
import helmet from 'helmet';

const app: Application = express();

app.set('trust proxy', true);
app.use(
    cors(),
    helmet(),
    express.json(),
    express.urlencoded({ extended: false })
);
app.disable('x-powered-by');

//Default routes + handlers
app.use('/', logger, express.static(join(dirname, '../client/build')));

//API routes + handlers
app.use('/api/', touristRouter, hotelRouter, adminRouter, miscRouter, onlyAllowPosts);

app.listen(PORT, () => {
    console.log(`🌍 HelaView web server is listening on port ${PORT}.`);
});