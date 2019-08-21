'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const styles = require('@ckeditor/ckeditor5-dev-utils').styles;
const CKEditorWebpackPlugin = require('@ckeditor/ckeditor5-dev-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'ckeditor.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'ckeditor.js',
    library: 'ClassicEditor',
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: {
              injectType: 'singletonStyleTag'
            }
          },
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          },
        ]
      }
    ]
  },
  plugins: [
    new CKEditorWebpackPlugin({
      language: 'en', // This value must be kept in sync with the language defined in src/ckeditor.js
      additionalLanguages: 'all'
    }),
    new HtmlWebpackPlugin({
      title: 'CKEditor 5 Classic build with Laravel image support',
      template: './src/index.html',
      inject: 'head'
    }),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true
      }),
    ]
  },
  performance: {
    hints: false
  },
  devtool: 'source-map',
  devServer: {
    port: 9000,
    open: true,
    before: (app) => {
      app.post('/my-laravel-endpoint', function(req, res) {
        res.json({
          uploaded: true,
          url: 'https://images.unsplash.com/photo-1525088052208-6cbaedf3981a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1024&q=80',
          token_send: req.header('X-CSRF-TOKEN')
        });
      });
    }
  }
};
