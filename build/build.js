'use strict'
require('./check-versions')()

process.env.NODE_ENV = 'production'

const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const config = require('../config')
const webpackConfig = require('./webpack.prod.conf')
const spinner = ora('building for production...')
spinner.start()

function runpack () {
  var conf = webpackConfig
    webpack(conf, function (err, stats) {
      if (err) throw err
      process.stdout.write(stats.toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
          // timings: true,
          // builtAt: true
        }) + '\n\n')

      if (stats.hasErrors()) {
        console.log(chalk.red('  Build failed with errors.\n'))
        process.exit(1)
      }

      spinner.stop()
      console.log(chalk.cyan('  Build complete.\n'))
      console.log(chalk.yellow(
        '  Tip: built files are meant to be served over an HTTP server.\n' +
        '  Opening index.html over file:// won\'t work.\n'
      ))

    })
}


rm(path.join(config.build.assetsRoot, ''), err => {
  if (err) throw err
    runpack();
})
