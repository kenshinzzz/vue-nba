'use strict'
const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

// 要配置ExtractTextPlugin，已解决打包问题，但是还有一个不关闭问题
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin')

// pwa插件
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

const env = require('../config/prod.env')


delete baseWebpackConfig.resolve.alias['vue'] // 需要删除，否则common包会重复打包vue
  const webpackConfig = merge(baseWebpackConfig, {
    module: {
      rules: utils.styleLoaders({
        sourceMap: config.build.productionSourceMap,
        extract: true,
        usePostCSS: true
      })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    output: {
      path: config.build.assetsRoot,
      publicPath: process.env.NODE_ENV === 'production' ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
      filename: utils.assetsPath('js/[name].[chunkhash].js'),
      chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    plugins: [
      // http://vuejs.github.io/vue-loader/en/workflow/production.html
      new webpack.DefinePlugin({
        'process.env': env
      }),
      // UglifyJs do not support ES6+, you can also use babel-minify for better treeshaking: https://github.com/babel/minify
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          drop_console: true
        },
        sourceMap: config.build.productionSourceMap,
        parallel: true
      }),
      // extract css into its own file
      new ExtractTextPlugin({
        filename: utils.assetsPath('css/[name].css'),
        // set the following option to `true` if you want to extract CSS from
        // codesplit chunks into this main css file as well.
        // This will result in *all* of your app's CSS being loaded upfront.
        allChunks: false,
      }),
      new SkeletonWebpackPlugin({
        webpackConfig: require('./webpack.skeleton.conf'),
        quiet: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSPlugin({
        cssProcessorOptions: config.build.productionSourceMap
          ? {safe: true, map: {inline: false}}
          : {safe: true}
      }),

      new HtmlWebpackPlugin({
        filename: process.env.NODE_ENV === 'testing'
          ? 'index.html'
          : config.build.assetsRoot + '/index.html',
        template: 'index.html',
        inject: true,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency',
        chunks: ['nba']
      })
    ].concat([
      // keep module.id stable when vender modules does not change
      new webpack.HashedModuleIdsPlugin(),
      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
      // split vendor js into its own file
      // extract webpack runtime and module manifest to its own file in order to
      // prevent vendor hash from being updated whenever app bundle is updated
      new webpack.optimize.CommonsChunkPlugin({
        name: ['vendor', 'manifest'],
        minChunks: Infinity,
      }),
      // This instance extracts shared chunks from code splitted chunks and bundles them
      // in a separate chunk, similar to the vendor chunk
      // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        async: 'vendor-async',
        children: true,
        minChunks: 3,
      }),
      new InlineManifestWebpackPlugin(),
      new SWPrecacheWebpackPlugin({
        cacheId: 'vue-nba-app',
        filename: 'service-worker.js',
        staticFileGlobs: ['dist/**/*.{js,html,css}'],
        minify: true,
        stripPrefix: 'dist' // 用于replace  staticFileGlobs中的文件前缀
      })
    ])
  })

    webpackConfig.plugins.push(
      // copy custom static assets
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../static'),
          to: config.build.assetsResSubDirectory,
          ignore: ['.*']
        }
      ])
    )

  if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
      new CompressionWebpackPlugin({
        asset: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          config.build.productionGzipExtensions.join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8
      })
    )
  }

  if (config.build.bundleAnalyzerReport) {
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    webpackConfig.plugins.push(new BundleAnalyzerPlugin())
  }


module.exports = webpackConfig
