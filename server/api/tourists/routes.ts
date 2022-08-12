'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { addRoutes } from '../../lib/shared.js';

const touristRouter: Router = Router();

(async () => {
    await addRoutes(fileURLToPath(import.meta.url), 'tourist', touristRouter);
})();

export default touristRouter;