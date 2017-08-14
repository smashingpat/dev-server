const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');


const defaultParams = {
    server: true,
};
module.exports = (userParams) => {
    const params = Object.assign({}, defaultParams, userParams);

    return [
        {
            test: /.jsx?$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        },
        {
            test: /.css$/,
            use: ExtractTextWebpackPlugin.extract({
                use: [
                    'css-loader',
                ],
            }),
        },
    ];
};
