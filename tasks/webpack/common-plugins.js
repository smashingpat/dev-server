const webpack = require('webpack');
const config = require('../config');

const defaultParams = {
    server: false,
};
module.exports = (params = {}) => {
    const options = Object.assign({}, defaultParams, params);

    return [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(config.production ? 'production' : 'development'),
                DEV_SERVER: JSON.stringify(Boolean(config.devServer)),
            },
        }),
    ];
};
