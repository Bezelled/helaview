'use strict';

import express, { Application } from 'express';
import { router } from './src/routes.js';
import { login } from './src/api/users/login.js';
import { register } from './src/api/users/register.js';
import { PORT } from './src/config/globals.js';
import { onlyAllowPosts } from './src/middleware/methods.js';

// import { HDB } from './src/db.js';

const app: Application = express();

//Middleware that will allow the app to handle incoming POST/PUT requests with data
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', router);
app.use('/api/', login);
app.use('/api/', register);
app.use('/api/', onlyAllowPosts);

app.listen(PORT, () => {
    console.log(`🌍 HelaView app is listening on port ${PORT}.`);
});