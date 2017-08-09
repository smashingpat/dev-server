const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { config } = require('./config');


const commonLoaders = () => [
    { test: /.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
];

const commonPlugins = () => [
    new webpack.optimize.ModuleConcatenationPlugin(),
    config.production && new webpack.optimize.UglifyJsPlugin(),
].filter(Boolean);

exports.browserConfig = {
    context: path.resolve(__dirname, '..'),
    entry: ['./src/browser/main'],
    output: {
        path: path.resolve(__dirname, '../public'),
        filename: 'assets/[name].bundle.js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        loaders: commonLoaders(),
    },
    plugins: [
        ...commonPlugins(),
        new HtmlWebpackPlugin({
            template: './src/browser/shell.html',
            filename: 'shell.html',
        }),
    ],
};

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
};

exports.createConfigWithHMR = webpackConfig => Object.assign({}, webpackConfig, {
    entry: [
        'webpack-hot-middleware/client',
        ...webpackConfig.entry,
    ],
    plugins: [
        ...webpackConfig.plugins,
        new webpack.HotModuleReplacementPlugin(),
    ],
});

exports.createBundler = webpackConfig => webpack(webpackConfig);
