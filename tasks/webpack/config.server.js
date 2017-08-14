const path = require('path');
const nodeExternals = require('webpack-node-externals');
const getCommonPlugins = require('./common-plugins');
const getCommonLoaders = require('./common-loaders');
const getCommonResolve = require('./common-resolve');


const rootDir = path.resolve(__dirname, '../..');
const plugins = getCommonPlugins({ server: true });
const loaders = getCommonLoaders({ server: true });
const resolve = getCommonResolve({ server: true });

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    context: rootDir,
    entry: ['./src/server'],
    output: {
        path: path.resolve(__dirname, '../..'),
        filename: 'server.js',
        libraryTarget: 'umd',
    },
    resolve,
    externals: [nodeExternals()],
    module: {
        loaders,
    },
    plugins: [
        ...plugins,
    ],
};
