'use strict';

import { Router } from 'express';
import { readdirSync } from 'fs';
import { join }  from 'path';
import { fileURLToPath } from 'url';

const touristRouter: Router = Router();
const __filename: string = fileURLToPath(import.meta.url);
const _dirname: string = `file:///${__filename.substring(0, __filename.lastIndexOf('\\routes.js'))}`;

console.log(_dirname);

async function* getTouristRoutes(){

    for (const routeFile of readdirSync('C:\\Users\\shane\\Desktop\\Projects\\HelaView\\dist\\server\\api\\tourists')) {
        
        if ((routeFile === 'routes.js') || (!(routeFile.endsWith('.js'))))
            continue;
        
        console.log(`[Adding tourist route]: ${routeFile}.`);
        yield await import(join(_dirname, routeFile));
    };
}

(async () => {
    
    for await (const {default: touristRoute} of getTouristRoutes()) {
        
        if (typeof touristRoute === 'function')
            touristRoute(touristRouter);
    };
})();

export default touristRouter;