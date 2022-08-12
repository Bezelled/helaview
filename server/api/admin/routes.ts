'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { AccountType } from '../../config/globals.js';
import { getRoutes } from '../../lib/shared.js';
import { authenticateJWT } from '../../middleware/auth.js';

const adminRouter: Router = Router();
adminRouter.use(authenticateJWT(AccountType.Admin));

(async () => {
    
    for await (const {default: adminRoute} of getRoutes(fileURLToPath(import.meta.url), 'admin')) {
        
        if (typeof adminRoute === 'function')
            adminRoute(adminRouter);
    };
})();

export default adminRouter;