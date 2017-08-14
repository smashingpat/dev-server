const express = require('express');
const assetsInjection = require('./middleware/assets-injection');
const serverInjection = require('./middleware/server-injection');
const { createBundler, browserConfig } = require('./webpack');
const clean = require('./clean');
const { promiseSeries } = require('./utils');


const initialAssetsBuild = () => new Promise((resolve, reject) => {
    createBundler(browserConfig).run((err, stats) => {
        if (err) reject(err);
        resolve(stats);
    });
});

/*
    DevServer setup & middleware
------------------------------------------ */
const port = 8080;
const server = express();


/*
    Start the DevServer
------------------------------------------ */
const startDevServer = () => {
    server.use([
        assetsInjection(),
        serverInjection(),
    ]);
    server.listen(port, () => {
        const message = `dev-server listening at http://localhost:${port}`;
        const line = new Array(message.length + 1).join('=');

        console.log([
            '',
            line,
            message,
            line,
            '',
        ].join('\n'));
    });
};

promiseSeries([
    clean(),
    initialAssetsBuild(),
]).then(startDevServer);
