const path = require('path');
const { argv } = require('yargs');


process.env.NODE_ENV = argv.production ? 'production' : 'development';

module.exports = {
    port: argv.port || 8080,
    open: argv.open || false,
    devServer: argv.serve,
    production: argv.production,
    folders: {
        assets: path.resolve(__dirname, '../static-rev'),
    },
};
