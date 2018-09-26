const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  entry: './index.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'bundle.js',
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
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'pages/index.ejs'
    }),
    new webpack.NamedModulesPlugin(),
  ]
}