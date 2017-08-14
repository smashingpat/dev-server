const { createBundler, configServer } = require('../../webpack');
const { events, WEBPACK_BUNDLE_ASSETS_DONE } = require('../../lib/events');

module.exports = () => {
    const bundler = createBundler(configServer);
    const noopHandler = (req, res, next) => next();


    let handler = noopHandler;

    const replaceServer = () => {
        console.log('replacing server');
        delete require.cache[require.resolve('../../../server')];
        const { server } = require('../../../server'); // eslint-disable-line global-require

        handler = server;
    };

    bundler.watch({}, (err) => {
        if (err) throw new Error(err);

        replaceServer();
    });

    events.on(WEBPACK_BUNDLE_ASSETS_DONE, replaceServer);

    return (...args) => handler(...args);
};
