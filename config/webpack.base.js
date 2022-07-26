const path = require('path')
const utils = require('./utils')
const nodeExcternals = require('webpack-node-externals')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const webpack  = require('webpack')

const webpackconfig = {
  target: 'node',
  mode: 'development',
  entry: {
    server: path.join(utils.APP_PATH, 'index.js')
  },
  output: {
    filename: '[name].bundle.js',
    path: utils.DIST_PATH
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: [path.join(__dirname, '/node_modules')]
      }
    ]
  },
  externals: [nodeExcternals()],
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: (process.env.NODE_ENV === 'production' || 
        process.env.NODE_ENV === 'prod') ? 'production' : 'development'
      }
    })
    // new webpack.EnvironmentPlugin(['NODE_ENV'])
  ],
  node: {
    global: true,
    __dirname: true,
    __filename: true
  }
}

module.exports = webpackconfig