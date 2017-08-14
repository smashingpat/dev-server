const path = require('path');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const getCommonPlugins = require('./common-plugins');
const getCommonLoaders = require('./common-loaders');
const getCommonResolve = require('./common-resolve');
const config = require('../config');


const rootDir = path.resolve(__dirname, '../..');
const plugins = getCommonPlugins();
const loaders = getCommonLoaders();
const resolve = getCommonResolve();

module.exports = {
    context: rootDir,
    entry: ['./src/browser/main'],
    output: {
        path: path.resolve(rootDir, 'static-rev'),
        filename: config.production ? '[name].[hash].js' : '[name].js',
    },
    resolve,
    module: {
        loaders,
    },
    plugins: [
        ...plugins,
        new AssetsWebpackPlugin({
            prettyPrint: true,
            filename: 'manifest.json',
        }),
    ],
};
