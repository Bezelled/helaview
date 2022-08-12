'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { addRoutes } from '../../lib/shared.js';

const hotelRouter: Router = Router();

(async () => {
    await addRoutes(fileURLToPath(import.meta.url), 'hotel', hotelRouter);
})();

export default hotelRouter;