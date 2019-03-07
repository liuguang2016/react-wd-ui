const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './app.js',
  output: {
    filename: '[name].js',
    path: path.join( __dirname, '../lib' ),
    libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    contentBase: './lib'
  },
  plugins: [
    new CleanWebpackPlugin({cleanOnceBeforeBuildPatterns: ['**/*', '../lib']}),
    new htmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
};