const { createBundler, serverConfig } = require('../webpack');

const newServerConfig = Object.assign({}, serverConfig, {
    output: Object.assign({}, serverConfig.output, {
        libraryTarget: 'umd',
    }),
});


const createServerInjection = () => {
    const bundler = createBundler(newServerConfig);
    const noopHandler = (req, res, next) => next();

    let serverHandler = noopHandler;

    bundler.watch({}, (err, stats) => {
        if (err) throw new Error(err);

        const json = stats.toJson();
        const isUpdated = json.chunks.reduce((bool, chunk) => chunk.rendered || bool, false);

        if (isUpdated) {
            delete require.cache[require.resolve('../../server')];
            const { server } = require('../../server'); // eslint-disable-line global-require

            if (typeof server !== 'function') {
                throw new Error('export `server` was not a function');
            }
            serverHandler = server;
        }
    });

    return (...args) => serverHandler(...args);
};

module.exports = createServerInjection;
