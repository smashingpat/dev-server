const chalk = require('chalk');
const express = require('express');
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
const bundler = createBundler(createConfigWithHMR(browserConfig));

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
