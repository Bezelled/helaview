'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { getRoutes } from '../../lib/shared.js';

const miscRouter: Router = Router();

(async () => {
    
    for await (const {default: miscRoute} of getRoutes(fileURLToPath(import.meta.url), 'misc')) {
        
        if (typeof miscRoute === 'function')
            miscRoute(miscRouter);
    };
})();

export default miscRouter;