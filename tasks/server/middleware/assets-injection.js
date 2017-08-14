const browserSync = require('browser-sync');
const webpackDevMiddleware = require('webpack-dev-middleware');
const { createBundler, configBrowser } = require('../../webpack');
const {
    events,
    WEBPACK_BUNDLE_ASSETS_DONE,
    WEBPACK_BUNDLE_ASSETS_PENDING,
} = require('../../lib/events');

module.exports = () => {
    const bundler = createBundler(configBrowser);
    const instance = webpackDevMiddleware(bundler, {
        quiet: true,
    });

    bundler.plugin('run', () => {
        events.emit(WEBPACK_BUNDLE_ASSETS_PENDING);
    });

    bundler.plugin('done', ({ compilation }) => {
        const files = Object.keys(compilation.assets);
        const css = files.filter(file => /.css$/.test(file));

        browserSync.get('dev-server').reload(css);
        events.emit(WEBPACK_BUNDLE_ASSETS_DONE);
    });

    return instance;
};
