'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { getRoutes } from '../../lib/shared.js';

const hotelRouter: Router = Router();

(async () => {
    
    for await (const {default: hotelRoute} of getRoutes(fileURLToPath(import.meta.url), 'hotel')) {
        
        if (typeof hotelRoute === 'function')
            hotelRoute(hotelRouter);
    };
})();

export default hotelRouter;