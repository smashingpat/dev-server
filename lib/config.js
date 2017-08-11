const { argv } = require('yargs');

exports.config = {
    production: !!argv.production,
    hmr: !argv.production,
};
