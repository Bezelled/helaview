'use strict';

import { Router } from 'express';
import { readdirSync } from 'fs';
import { join }  from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const touristRouter: Router = Router();

const __filename = fileURLToPath(import.meta.url);
let _dirname: string = '';
// let _filename: string = '';

async function* getTouristRoutes(){

    if (platform() === 'linux'){
        _dirname = __filename.substring(0, __filename.lastIndexOf('/routes.js'));
        // _filename = `file://${__filename.substring(0, __filename.lastIndexOf('/routes.js'))}`;
    } else {
        _dirname = __filename.substring(0, __filename.lastIndexOf('\\routes.js'));
        // _filename = `file:///${__filename.substring(0, __filename.lastIndexOf('\\routes.js'))}`;
    };

    console.log(`[TOURIST DIRNAME]: ${_dirname}`);

    for (const routeFile of readdirSync(_dirname)) {
        
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