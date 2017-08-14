const browserSync = require('browser-sync');
const { middleware } = require('./middleware');
const config = require('../config');


const bs = browserSync.create('dev-server');
const bsConfig = {
    middleware,
    port: config.port,
    open: config.open,
    logLevel: 'silent',
};

bs.init(bsConfig, () => {
    const message = ` server running at http://localhost:${bs.getOption('port')} `;
    const line = Array(message.length + 1).join('=');

    console.log([
        '',
        line,
        message,
        line,
        '',
    ].join('\n'));
});
