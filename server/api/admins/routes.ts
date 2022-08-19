'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { AccountType } from '../../config/globals.js';
import { addRoutes } from '../../lib/shared.js';
import { authenticateJWT } from '../../middleware/auth.js';

const adminRouter: Router = Router();
adminRouter.use(authenticateJWT(AccountType.Admin));

(async () => {
    await addRoutes(fileURLToPath(import.meta.url), 'admin', adminRouter);
})();

export default adminRouter;