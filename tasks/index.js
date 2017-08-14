const { argv } = require('yargs');
const { startServer } = require('./server');


if (argv.serve) {
    startServer();
}
