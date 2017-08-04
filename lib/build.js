const { createBundler, browserConfig, serverConfig } = require('./webpack');

const bundler = createBundler([
    browserConfig,
    serverConfig,
]);

bundler.run((err, stats) => {
    if (err) throw new Error(err.message || err);

    console.log(stats.toString({
        colors: true,
    }));
});
