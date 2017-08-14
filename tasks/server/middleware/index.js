const { Router } = require('express');
const assetsInjection = require('./assets-injection');
const serverInjection = require('./server-injection');
const errorHandler = require('./error-handler');

const middleware = Router();

middleware.use([
    assetsInjection(),
    serverInjection(),
    errorHandler,
]);

exports.middleware = middleware;
