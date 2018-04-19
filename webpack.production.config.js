'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/main.js')
  ],
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: '[name]-[hash].min.js',
    publicPath: '/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: 'app/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new StatsPlugin('webpack.stats.json', {
      source: false,
      modules: false
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
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
  },
  postcss: [
    require('autoprefixer')
  ]
};
