const {merge} = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  status: {children : false, warnings: false }
})

module.exports = webpackConfig