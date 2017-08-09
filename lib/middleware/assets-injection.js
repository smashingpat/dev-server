const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const MemoryFileSystem = require('memory-fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const {
    createBundler,
    createConfigWithHMR,
    browserConfig,
} = require('../webpack');
const { config } = require('../config');

const memoryFS = new MemoryFileSystem();
const bundlerConfig = config.hmr ? createConfigWithHMR(browserConfig) : browserConfig;
const bundler = createBundler(bundlerConfig);

bundler.outputFileSystem = memoryFS;

bundler.plugin('done', ({ compilation }) => {
    const { assets } = compilation;
    const regexp = /.hot-update.js(on)?$/;
    const files = Object.keys(compilation.assets)
        .filter(file => !regexp.test(file))
        .map(key => assets[key]);

    files.forEach((file) => {
        const fileDir = path.dirname(file.existsAt);

        mkdirp(fileDir, (err) => {
            if (err) console.error(err);

            const contents = memoryFS.readFileSync(file.existsAt);

            fs.writeFile(file.existsAt, contents, { flag: 'w' }, (writeError) => {
                if (writeError) throw new Error(err);
            });
        });
    });
});


module.exports = () => [
    webpackDevMiddleware(bundler, {
        stats: {
            colors: true,
            chunks: false,
        },
        publicPath: browserConfig.output.publicPath,
        noInfo: true,
    }),
    config.hmr && webpackHotMiddleware(bundler),
].filter(Boolean);
