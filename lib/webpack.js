const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals')


const commonLoaders = () => [
    { test: /.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
];

const commonPlugins = () => [];

exports.browserConfig = {
    context: path.resolve(__dirname, '..'),
    entry: ['./src/browser/main'],
    output: {
        path: path.resolve(__dirname, '../public/assets'),
        filename: '[name].bundle.js',
        publicPath: '/assets',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        loaders: commonLoaders(),
    },
    plugins: commonPlugins(),
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
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        loaders: commonLoaders(),
    },
    plugins: commonPlugins(),
}

exports.createConfigWithHMR = config => Object.assign({}, config, {
    entry: [
        'webpack-hot-middleware/client',
        ...config.entry,
    ],
    plugins: [
        ...config.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
});

exports.createBundler = (config) => webpack(config);
