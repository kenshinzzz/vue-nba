'use strict';

const path = require('path')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const nodeExternals = require('webpack-node-externals')

function resolve(dir) {
  return path.join(__dirname, dir)
}
delete baseWebpackConfig.resolve.alias['vue']

module.exports = merge(baseWebpackConfig, {
  target: 'node',
  devtool: false,
  entry: {
    nba: resolve('../src/nba/skeleton/entry-skeleton.js')
  },
  output: Object.assign({}, baseWebpackConfig.output, {
    libraryTarget: 'commonjs2'
  }),
  externals: nodeExternals({
    whitelist: /\.css$/
  }),
  plugins: []
})
