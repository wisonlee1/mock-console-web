const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const cleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
    './index.js'
  ],
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
    publicPath: `/build/`, // publicPath 一定以 / 结束
  },
  devServer: {
    port: 9000,
    compress: true,
    proxy: {
      '/api': 'http://localhost:8080'
    },
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['react-hot-loader/babel', '@babel/plugin-proposal-class-properties'],
          }
        }
      },
    ]
  },
  plugins: [
    new cleanWebpackPlugin(['build/*.*']),
    new HtmlWebpackPlugin({
      template: 'pages/index.ejs'
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}