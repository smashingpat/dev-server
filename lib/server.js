const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const express = require('express');
const MemoryFileSystem = require('memory-fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const { serverMiddleware } = require('./handlers');
const {
    createBundler,
    createConfigWithHMR,
    browserConfig,
} = require('./webpack');


/*
    DevServer setup & middleware
------------------------------------------ */
const port = 8080;
const server = express();
const memoryFS = new MemoryFileSystem();
const bundler = createBundler(createConfigWithHMR(browserConfig));

bundler.outputFileSystem = memoryFS;

bundler.plugin('done', ({ compilation }) => {
    const { assets } = compilation;
    const regexp = /.hot-update.js(on)?$/;
    const files = Object.keys(compilation.assets)
        .filter(file => !regexp.test(file))
        .map(key => assets[key]);

    files.forEach((file) => {
        const fileDir = path.dirname(file.existsAt);
        const fileName = path.basename(file.existsAt);

        mkdirp(fileDir, (err) => {
            if (err) console.error(err);

            const contents = memoryFS.readFileSync(file.existsAt);

            fs.writeFile(file.existsAt, contents, { flag: 'w' }, (writeError) => {
                if (writeError) throw new Error(err);
            });
        });
    });
});

server.use(webpackDevMiddleware(bundler, {
    stats: {
        colors: true,
        chunks: false,
    },
    publicPath: browserConfig.output.publicPath,
    noInfo: true,
}));
server.use(webpackHotMiddleware(bundler));
server.use(serverMiddleware());


/*
    Start te DevServer
------------------------------------------ */
server.listen(port, () => {
    const message = ` dev-server listening at http://localhost:${port} `;
    const line = new Array(message.length + 1).join('=');

    console.log(chalk.bgBlue.white([
        '',
        line,
        message,
        line,
        '',
    ].join('\n')));
});
