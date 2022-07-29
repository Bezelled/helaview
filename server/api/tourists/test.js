'use strict';

import { readdirSync } from 'fs';
// import { join }  from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

console.log(platform());

const __filename = fileURLToPath(import.meta.url);
let _dirname = '';

if (platform() === 'linux'){
    _dirname = __filename.substring(0, __filename.lastIndexOf('/test.js'));
} else {
    _dirname = __filename.substring(0, __filename.lastIndexOf('\\test.js'));
};
const _filename = `file:///${__filename.substring(0, __filename.lastIndexOf('/test.js'))}`;

console.log(`[DIRNAME]: ${_dirname}`);
console.log(`[FILENAME]: ${_filename}`);

for (const routeFile of readdirSync(_dirname)) {
    
    if ((routeFile === 'routes.js') || (!(routeFile.endsWith('.js'))))
        continue;
    
    console.log(`[Adding hotel route]: ${routeFile}.`);
}