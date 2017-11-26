/**
 * Created by elly on 16/5/31.
 */
const path = require('path');
const webpack = require('webpack');
const Nyan = require('nyan-progress-webpack-plugin');
const openBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
    entry: './examples/src/index.js',
    output: {
        filename: 'index.js',
        publicPath: "http://0.0.0.0:9010/lib/",
        path: path.join(__dirname, './examples/lib')
    },
    devServer: {
        contentBase: path.join(__dirname, "examples"),
        historyApiFallback: true,
        host: "0.0.0.0",
        bonjour: true,
        inline: true,
        port: 9010,
        hot: true
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }, {
            test: /\.(less|css)?$/,
            loader: 'style-loader!css-loader!less-loader'
        }, {
            test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
            loader: "file-loader"
        }]
    },
    devtool: "#inline-source-map",
    plugins: [
        new Nyan(),
        new webpack.HotModuleReplacementPlugin(),
        // new openBrowserPlugin({url: 'http://localhost:9010'})
    ]
};
