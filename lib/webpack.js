const path = require('path');
const webpack = require('webpack');
const WriteFileWebpackPlugin = require('write-file-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const { config } = require('./config');


const rootDir = path.resolve(__dirname, '..');
const assetsFolder = path.resolve(__dirname, '../static-rev');


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
    {
        test: /\.(png|jpg|gif|svg|html)$/,
        loader: 'file-loader',
        options: {
            name: '[name].[hash].[ext]',
            context: rootDir,
            emitFile: params.server,
            outputPath: filename => path.relative(rootDir, path.join(assetsFolder, filename)),
        },
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
    context: rootDir,
    entry: ['./src/browser/main'],
    output: {
        path: assetsFolder,
        filename: '[name].[hash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    module: {
        loaders: commonLoaders(),
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: mod => mod.context && mod.context.indexOf('node_modules') !== -1,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'runtime',
            minChunks: Infinity,
        }),
        new webpack.optimize.CommonsChunkPlugin({
            async: true,
            children: true,
            minChunks: 4,
        }),
        new webpack.HashedModuleIdsPlugin(),
        new AssetsPlugin({ filename: 'static-rev/manifest.json' }),
        new WriteFileWebpackPlugin({
            text: /^((?!hot-update).)*$/g,
        }),
        ...commonPlugins(),
    ],
};

exports.serverConfig = {
    context: rootDir,
    node: {
        __dirname: false,
        __filename: false,
    },
    target: 'node',
    entry: './src/server',
    output: {
        path: rootDir,
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
