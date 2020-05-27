'use strict';

var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
//var ExtractTextPlugin = require('extract-text-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');
var StatsPlugin = require('stats-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: [
        path.join(__dirname, 'app/main.js')
    ],
    output: {
        path: path.join(__dirname, '/dist/'),
        filename: '[name]-[hash].min.js',
        publicPath: '/'
    },
    optimization: {
        minimize: true, //noEmitOnErrors: true
        minimizer: [
            new TerserPlugin({
                //  parallel: true,
                //  sourceMap: true, // Must be set to true if using source-maps in production
                terserOptions: {
                    // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
                    // mangle: {
                    //     properties: { }
                    // }
                },
                // Uncomment lines below for cache invalidation correctly
                cache: true,
                cacheKeys: (defaultCacheKeys) => {
                    delete defaultCacheKeys.terser;

                    return Object.assign({},
                        defaultCacheKeys, { 'uglify-js': require('uglify-js/package.json').version },
                    );
                },
                minify: (file, sourceMap) => {
                    // https://github.com/mishoo/UglifyJS2#minify-options
                    const uglifyJsOptions = {
                        /* your `uglify-js` package options */
                        toplevel: true
                    };

                    if (sourceMap) {
                        uglifyJsOptions.sourceMap = {
                            content: sourceMap,
                        };
                    }

                    return require('uglify-js').minify(file, uglifyJsOptions);
                },
            }),
        ]
    },
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new HtmlWebpackPlugin({
            template: 'app/index.tpl.html',
            inject: 'body',
            filename: 'index.html'
        }),
        new MiniCssExtractPlugin(),
        // new ExtractTextPlugin('[name]-[hash].min.css'),
        // new webpack.optimize.UglifyJsPlugin({
        //     compressor: {
        //         warnings: false,
        //         screw_ie8: true
        //     }
        // }),
        new StatsPlugin('webpack.stats.json', {
            source: false,
            modules: false
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }),
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
                postcss: [
                    require('autoprefixer')
                ]
            }
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
                    MiniCssExtractPlugin.loader,
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