const { argv } = require('yargs');
const path = require('path');

exports.config = {
    production: !!argv.production,
    hmr: !argv.production,
    assetsFolder: path.resolve(__dirname, '../static-rev'),
};
