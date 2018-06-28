'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfigs = require('./webpack.base.conf')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

const portfinder = require('portfinder')
const express = require('express')
const path = require('path')

var HtmlPlugin = [];
var entries = {nba: './src/nba/main.js'};
var baseWebpackConfig = baseWebpackConfigs.baseWebpackConfig(entries);
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
    HtmlPlugin.push(new HtmlWebpackPlugin({
        filename: name + '/index.html',
        template: 'index.html',
        inject: true,
        chunks: [name]
    }))
})

const devWebpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.dev.cssSourceMap,
            usePostCSS: true
        })
    },
    // cheap-module-eval-source-map is faster for development
    devtool: config.dev.devtool,

    // these devServer options should be customized in /config/index.js
    // --progress 会打印过程信息
    devServer: {
        historyApiFallback: true,
        hot: true,
        disableHostCheck: true,
        host: process.env.HOST ||  config.dev.host,
        port: process.env.PORT ||  config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: config.dev.errorOverlay ? {
            warnings: false,
            errors: true,
        } : false,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: false, // necessary for FriendlyErrorsPlugin  关闭了则不能输出编译信息
        watchOptions: {
            poll: config.dev.poll,
        },
        before: function (app) {
            // Here you can access the Express app object and add your own custom middleware to it.
            // For example, to define custom handlers for some paths:
            // app.get('/some/path', function(req, res) {
            //   res.json({ custom: 'response' });
            // });
            var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
            app.use(staticPath, express.static('./static'))
            var testDataPath = path.posix.join(config.dev.assetsPublicPath, 'test/data')
            app.use(testDataPath, express.static('./test/data'))
        },
        stats: {
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }
    },
    plugins: [
    new webpack.DefinePlugin({
                'process.env': require('../config/dev.env')
            }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    /*new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin()*/
  ].concat(HtmlPlugin).concat(
      new webpack.HashedModuleIdsPlugin(),
      // new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'vendor-async',
        children: true,
        minChunks: 3,
      }),
      new InlineManifestWebpackPlugin()
    ) //.concat([new FriendlyErrorsPlugin()])
})


module.exports = new Promise((resolve, reject) => {
    portfinder.basePort = process.env.PORT || config.dev.port
    portfinder.getPort((err, port) => {
        if (err) {
            reject(err)
        } else {
            // publish the new Port, necessary for e2e tests
            process.env.PORT = port
                // add port to devServer config
            devWebpackConfig.devServer.port = port

            // Add FriendlyErrorsPlugin
            // devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
            //   compilationSuccessInfo: {
            //     messages: [`Your application is running here: http://${config.dev.host}:${port}`],
            //   },
            //   onErrors: config.dev.notifyOnErrors
            //   ? utils.createNotifierCallback()
            //   : undefined
            // }))

            resolve(devWebpackConfig)
        }
    })
})
