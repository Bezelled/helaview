'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { getRoutes } from '../../lib/shared.js';

const touristRouter: Router = Router();

(async () => {
    
    for await (const {default: touristRoute} of getRoutes(fileURLToPath(import.meta.url), 'tourist')) {
        
        if (typeof touristRoute === 'function')
            touristRoute(touristRouter);
    };
})();

export default touristRouter;