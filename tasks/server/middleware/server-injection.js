const { createBundler, configServer } = require('../../webpack');
const { events, WEBPACK_BUNDLE_ASSETS } = require('../../events');

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

    bundler.watch({}, (err, stats) => {
        if (err) throw new Error(err);

        console.log(stats.toString({
            chunks: false,
            colors: true,
        }));

        replaceServer();
    });

    events.on(WEBPACK_BUNDLE_ASSETS, replaceServer);

    return (...args) => handler(...args);
};
