'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: "production",
  performance: {
    hints: process.env.NODE_ENV === 'production' ? "warning" : false
  },
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
      test: /\.(js|jsx)?$/,
      use: ['babel-loader'],
      exclude: /node_modules/,
      include: path.join(__dirname, 'app'),
    }, {
      test: /\.css$/,
      use: [
        {loader: "style-loader"},
        {
          loader: "css-loader",
          options: {
           modules: true,
           localIdentName: '[path][name]__[local]--[hash:base64:5]'
          }
        }
      ],
      include: path.join(__dirname, 'app')
    }, {
      test: /\.(html)$/,
      use: ['html-loader']
    }, {
      test: /\.(json)$/,
      use: ['json']
    }]
  }
};
