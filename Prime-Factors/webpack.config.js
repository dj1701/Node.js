
var path = require('path');
var webpack = require('webpack');

module.exports = {
  mode: "none",
  entry: ['babel-polyfill','./src/index.js'],
  output: {
      path: path.join(__dirname, 'public/dist'),
      filename: 'bundle.js',
      publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};
