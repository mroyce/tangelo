const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const CYPRESS_APP_DIR = path.resolve(__dirname, 'cypress/app/');


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
    app: CYPRESS_APP_DIR + '/index.js'
  },

  output: {
    path: CYPRESS_APP_DIR,
    filename: './static/[name].js',
  },

  plugins: [
    new ExtractTextPlugin('styles.css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: CYPRESS_APP_DIR + '/index.html',
    }),
  ],
};
