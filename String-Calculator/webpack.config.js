
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
      path: path.join(__dirname, 'public/dist'),
      filename: 'bundle.js',
      publicPath: '/'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      }
    ]
  },
};
