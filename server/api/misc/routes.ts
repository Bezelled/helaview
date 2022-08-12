'use strict';

import { Router } from 'express';
import { fileURLToPath } from 'url';
import { addRoutes } from '../../lib/shared.js';

const miscRouter: Router = Router();

(async () => {
    await addRoutes(fileURLToPath(import.meta.url), 'misc', miscRouter);
})();

export default miscRouter;