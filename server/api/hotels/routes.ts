'use strict';

import { Router } from 'express';
import { readdirSync } from 'fs';
import { join }  from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

console.log(platform());
const hotelRouter: Router = Router();

async function* getHotelRoutes(){

    const __filename: string = fileURLToPath(import.meta.url);
    let _dirname: string = '';
    
    if (platform() === 'linux'){
        _dirname = `file:///${__filename.substring(0, __filename.lastIndexOf('/routes.js'))}`;
    } else {
        _dirname = `file:///${__filename.substring(0, __filename.lastIndexOf('\\routes.js'))}`;
    };

    console.log(`[HOTEL DIRNAME]: ${_dirname}`);

    for (const routeFile of readdirSync('C:\\Users\\shane\\Desktop\\Projects\\HelaView\\dist\\server\\api\\hotels')) {
        
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