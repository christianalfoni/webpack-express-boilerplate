'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: [
        'webpack-hot-middleware/client?reload=true',
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name].js',
        publicPath: '/'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        })
    ],
    module: {
        rules: [{
            test: /\.jsx?$/i,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
                "presets": ["@babel/react", "@babel/env"]
            }
        }, {
            test: /\.json?$/i,
            loader: 'json-loader'
        }, {
            test: /\.css$/i,
            exclude: /node_modules/,
            use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true
                        }
                    }
                ]
                //loader: 'style-loader!css-loader?modules&localIdentName=[name]---[local]---[hash:base64:5]'
        }]
    }
};