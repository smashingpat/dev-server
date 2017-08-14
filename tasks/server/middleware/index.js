const { Router } = require('express');
const assetsInjection = require('./assets-injection');
const serverInjection = require('./server-injection');

const middleware = Router();

middleware.use([
    assetsInjection(),
    serverInjection(),
]);

exports.middleware = middleware;
