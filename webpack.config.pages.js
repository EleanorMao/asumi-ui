/**
 * Created by elly on 16/5/31.
 */
const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './examples/src/index.js',
    output: {
        filename: 'index.js',
        path: path.join(__dirname, './examples/lib')
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
};
