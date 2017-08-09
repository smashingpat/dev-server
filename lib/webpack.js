const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { config } = require('./config');


const commonLoaders = (params = {}) => [
    {
        test: /.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
    },
    {
        test: /.css$/,
        use: !params.server ? ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader'],
        }) : ['css-loader/locals'],
    },
];

const commonPlugins = (params = {}) => [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(config.production ? 'production' : 'development'),
        },
    }),
    !params.server && new ExtractTextPlugin({
        filename: 'assets/styles.css',
        disable: !config.production,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    config.production && new webpack.optimize.UglifyJsPlugin({
        output: {
            comments: false,
        },
    }),
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
        loaders: commonLoaders({ server: true }),
    },
    plugins: commonPlugins({ server: true }),
};

exports.createConfigWithHMR = webpackConfig =>
    (config.production ? webpackConfig : Object.assign({}, webpackConfig, {
        entry: [
            'webpack-hot-middleware/client',
            ...webpackConfig.entry,
        ],
        plugins: [
            ...webpackConfig.plugins,
            new webpack.HotModuleReplacementPlugin(),
        ],
    }));

exports.createBundler = webpackConfig => webpack(webpackConfig);
