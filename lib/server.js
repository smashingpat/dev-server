const express = require('express');
const assetsInjection = require('./middleware/assets-injection');
const serverInjection = require('./middleware/server-injection');


/*
    DevServer setup & middleware
------------------------------------------ */
const port = 8080;
const server = express();

server.use(assetsInjection());
server.use(serverInjection());


/*
    Start the DevServer
------------------------------------------ */
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
