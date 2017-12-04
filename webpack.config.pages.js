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
    externals: {'react': 'React', 'react-dom': 'ReactDOM'},
    module: {
        rules: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            use: 'babel-loader'
        }, {
            test: /\.(less|css)$/,
            use: ['style-loader', 'css-loader', 'less-loader']
        }, {
            test: /\.(svg|ttf|eot|svg|woff(\(?2\)?)?)(\?[a-zA-Z_0-9.=&]*)?(#[a-zA-Z_0-9.=&]*)?$/,
            use: "file-loader"
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({ie8: true})
    ]
};
