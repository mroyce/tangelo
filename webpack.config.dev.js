const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


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
        use: ['style-loader', 'css-loader'],
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: true,
      template: DEMO + '/index.html',
    }),
    new UglifyJSPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  devServer: {
    contentBase: BUILD,
    port: 3001,
    compress: true
  },
};
