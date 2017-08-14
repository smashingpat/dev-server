const path = require('path');
const nodeExternals = require('webpack-node-externals');
const getCommonPlugins = require('./common-plugins');


const plugins = getCommonPlugins({ server: true });

module.exports = {
    target: 'node',
    node: {
        __dirname: false,
        __filename: false,
    },
    context: path.resolve(__dirname, '../..'),
    entry: ['./src/server'],
    output: {
        path: path.resolve(__dirname, '../..'),
        filename: 'server.js',
        libraryTarget: 'umd',
    },
    externals: [nodeExternals()],
    plugins,
};
