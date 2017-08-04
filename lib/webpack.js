const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')


const commonLoaders = () => [
    { test: /.js$/, use: ['babel-loader'], exclude: /node_modules/ },
];

exports.browserConfig = {
    context: path.resolve(__dirname, '..'),
    entry: ['./src/browser'],
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: 'bundle.js',
        publicPath: '/assets',
    },
    module: {
        loaders: commonLoaders(),
    },
}

exports.serverConfig = {
    context: path.resolve(__dirname, '..'),
    node: {
        __dirname: false,
        __filename: false,
    },
    target: 'node',
    entry: './src/server',
    output: {
        path: path.resolve(__dirname, '..'),
        filename: 'server.js',
    },
    externals: [nodeExternals()],
    module: {
        loaders: commonLoaders(),
    },
}

exports.createConfigWithHMR = config => Object.assign({}, config, {
    entry: [
        'webpack-hot-middleware/client',
        ...config.entry,
    ],
});

exports.createBundler = (config) => webpack(config);
