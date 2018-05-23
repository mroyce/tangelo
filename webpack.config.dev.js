const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


const DEMO = path.resolve(__dirname, 'demo');
const BUILD = path.resolve(__dirname, 'build');


module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
        }),
      },
    ]
  },

  entry: {
    demo: DEMO + '/index.js'
  },

  output: {
    path: BUILD,
    filename: './static/[name].js',
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: DEMO + '/index.html',
    }),
    // TODO Use these when you publish the demo
    // new UglifyJSPlugin(),
    // new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    contentBase: BUILD,
    port: 3001,
    compress: true
  },
};
