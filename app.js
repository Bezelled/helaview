'use strict';

import express from 'express';
import { router } from './src/routes.js';
import { login } from './src/api/login.js';
import { PORT } from './src/config/globals.js';
import { HDB } from './src/db.js';

const app = express();

app.use('/', router);
app.use('/api/', login);

app.listen(PORT, () => {
    console.log(`HelaView app is listening on port ${PORT}.`);
});