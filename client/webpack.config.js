import { resolve } from 'path';

module.exports = {
    //...
    resolve: {
        alias: {
            'react': resolve(__dirname, 'node_modules/react'),
            'react-dom': resolve(__dirname, 'node_modules/react-dom')
        }
    },
  };