const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathToClean = ['dist'];

// the clean options to use
let cleanOptions = {
  root: process.cwd(),
  verbose: true,
  dry: false,
  watch: false,
};

module.exports = {
  entry: {
    main: './src/index.js',
  },
  mode: 'development',
  plugins: [
    new CleanWebpackPlugin(pathToClean, cleanOptions),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name]6-[hash].css',
      chunkFilename: '[name].css',
    }),
  ],

  output: {
    filename: '[name]-bundle-[hash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
  },
  devServer: {
    contentBase: '../dist',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src'],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpeg|jpg|png|gif)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000000,
              fallback: 'file-loader',
            },
          },
        ],
      },
    ],
  },
};
