const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [new MiniCssExtractPlugin()],
  entry: {
    index: './public/js/index.js',
    chat: './public/js/chat.js'
  },
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    path: __dirname + '/public/js/dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  target: 'node',
  watch: true
};