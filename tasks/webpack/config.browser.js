const path = require('path');
const AssetsWebpackPlugin = require('assets-webpack-plugin');
const getCommonPlugins = require('./common-plugins');


const rootDir = path.resolve(__dirname, '../..');
const plugins = getCommonPlugins();

module.exports = {
    context: rootDir,
    entry: ['./src/browser/main'],
    output: {
        path: path.resolve(rootDir, 'static-rev'),
        filename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    plugins: [
        ...plugins,
        new AssetsWebpackPlugin({
            prettyPrint: true,
            filename: 'manifest.json',
        }),
    ],
};
