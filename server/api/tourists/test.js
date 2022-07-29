'use strict';

import { readdirSync } from 'fs';
import { join }  from 'path';
import { fileURLToPath } from 'url';
import { platform } from 'os';

console.log(platform());

const __filename = fileURLToPath(import.meta.url);
let _dirname = '';
let _filename = '';

async function* getTests(){
    
    if (platform() === 'linux'){
        _dirname = __filename.substring(0, __filename.lastIndexOf('/test.js'));
        // _filename = `file://${__filename.substring(0, __filename.lastIndexOf('/test.js'))}`;
    } else {
        _dirname = __filename.substring(0, __filename.lastIndexOf('\\test.js'));
        // _filename = `file:///${__filename.substring(0, __filename.lastIndexOf('\\test.js'))}`;
    };

    for (const testFile of readdirSync(_dirname)) {
        
        if ((testFile === 'test.js') || (!(testFile.endsWith('.js'))))
            continue;
        
        console.log(`[Adding test]: ${testFile}.`);
        yield await import(join(_dirname, testFile));
    }
}

(async () => {
    
    for await (const {default: test} of getTests()) {
        
        if (typeof test === 'function')
            test();
    };
})();
