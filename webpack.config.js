const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'docs'),
    // publicPath: './dist/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-env']
        }
      },
      {
        test: /\.(scss|css)$/,
        'use': [
          MiniCssExtractPlugin.loader,
          // {
          //   loader: MiniCssExtractPlugin.loader,
          //   options: {
          //     publicPath: '../'
          //   }
          // },
          'css-loader',
          // { loader: 'css-loader', options: { url: false } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/',
              publicPath: 'img/',
              useRelativePath: true
            }
          }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            // options: {

            // }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      publicPath: '../'
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html'
    }),
    new HtmlWebpackPlugin({
      filename: 'project.html',
      template: 'src/project.html'
    }),
    new CleanWebpackPlugin(['docs'])
  ]
};
