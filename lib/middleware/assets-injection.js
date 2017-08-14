const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {
    createBundler,
    createConfigWithHMR,
    browserConfig,
} = require('../webpack');
const { bus, WEBPACK_BUNDLE_ASSETS } = require('../bus');
const { config } = require('../config');

const bundlerConfig = config.hmr ? createConfigWithHMR(browserConfig) : browserConfig;
const bundler = createBundler(bundlerConfig);


bundler.plugin('done', () => bus.emit(WEBPACK_BUNDLE_ASSETS));


module.exports = () => [
    webpackDevMiddleware(bundler, {
        stats: {
            colors: true,
            chunks: false,
        },
        noInfo: true,
        publicPath: browserConfig.output.publicPath,
    }),
    config.hmr && webpackHotMiddleware(bundler),
].filter(Boolean);
