'use strict';

import { Router } from 'express';
import { readdirSync } from 'fs';
import { join }  from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

const hotelRouter: Router = Router();

const __filename = fileURLToPath(import.meta.url);
let _dirname: string = '';
// let _filename: string = '';

async function* getHotelRoutes(){

    if (platform() === 'linux'){
        _dirname = __filename.substring(0, __filename.lastIndexOf('/routes.js'));
        // _filename = `file://${__filename.substring(0, __filename.lastIndexOf('/routes.js'))}`;
    } else {
        _dirname = __filename.substring(0, __filename.lastIndexOf('\\routes.js'));
        // _filename = `file:///${__filename.substring(0, __filename.lastIndexOf('\\routes.js'))}`;
    };

    console.log(`[HOTEL DIRNAME]: ${_dirname}`);

    for (const routeFile of readdirSync(_dirname)) {
        
        if ((routeFile === 'routes.js') || (!(routeFile.endsWith('.js'))))
            continue;
        
        console.log(`[Adding hotel route]: ${routeFile}.`);
        yield await import(join(_dirname, routeFile));
    };
}

(async () => {
    
    for await (const {default: hotelRoute} of getHotelRoutes()) {
        
        if (typeof hotelRoute === 'function')
            hotelRoute(hotelRouter);
    };
})();

export default hotelRouter;