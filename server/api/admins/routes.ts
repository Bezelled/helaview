'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { AccountType } from '../../config/globals.js';
import { addRoutes } from '../../lib/shared.js';
import { authenticateJWT } from '../../middleware/auth.js';

const adminRouter: Router = Router();

//  Implement JWT authorisation for all /admin routes
adminRouter.use(authenticateJWT([AccountType.Admin]));

//  Import all files under the admin folder, so they can add their routes to the router
(async () => {
    await addRoutes(fileURLToPath(import.meta.url), 'admin', adminRouter);
})();

//  Export it so our app.ts's Express instance can use this router
export default adminRouter;