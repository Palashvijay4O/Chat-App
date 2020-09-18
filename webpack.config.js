const path = require('path');

module.exports = {
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
        loader: 'css-loader'
      },
    ]
  },
  target: 'node'
};