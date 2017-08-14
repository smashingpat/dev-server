const webpackDevMiddleware = require('webpack-dev-middleware');
const { createBundler, configBrowser } = require('../../webpack');
const { events, WEBPACK_BUNDLE_ASSETS } = require('../../events');

module.exports = () => {
    const bundler = createBundler(configBrowser);

    bundler.plugin('done', () => events.emit(WEBPACK_BUNDLE_ASSETS));

    return webpackDevMiddleware(bundler, {
        stats: { colors: true },
    });
};
