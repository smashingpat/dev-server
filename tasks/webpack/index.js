const webpack = require('webpack');
const configBrowser = require('./config.browser');
const configServer = require('./config.server');


exports.configServer = configServer;
exports.configBrowser = configBrowser;

exports.createBundler = webpackConfig => webpack(webpackConfig);
