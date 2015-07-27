var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  node: {
    fs: 'empty'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'node_modules', 'pixi.js'),
      loader: 'transform?brfs',
    },{
      test: /\.json$/,
      include: path.join(__dirname, 'node_modules', 'pixi.js'),
      loader: 'json',
    },{
      test: /\.glsl$/,
      loader: 'webpack-glsl'
    },{
      test: /\.(jpg|png)?$/,
      loader: 'url-loader',
      include: path.join(__dirname, 'src')
    },{
      test: /\.jsx?$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    }]
  }
};
