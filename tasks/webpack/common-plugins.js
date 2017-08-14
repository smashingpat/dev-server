const webpack = require('webpack');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const config = require('../config');

const defaultParams = {
    server: false,
};
module.exports = (params = {}) => {
    const options = Object.assign({}, defaultParams, params);

    return [
        new ExtractTextWebpackPlugin({
            filename: config.production ? 'style.[hash].css' : 'style.css',
            disable: options.server,
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.production ? 'production' : 'development'),
                DEV_SERVER: JSON.stringify(Boolean(config.devServer)),
            },
        }),
    ].filter(Boolean);
};
