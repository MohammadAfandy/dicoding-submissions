const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[id].bundle.js',
    clean: true,
  },
  module: {
    rules: [
      // css file with extension module.css (local)
      {
        test: /\.css$/,
        use: [
          // {
          //   loader: 'style-loader', // style-loader add the css to the dom in style tag
          // },
          {
            loader: MiniCssExtractPlugin.loader, // extract the css into separate .css file
          },
          {
            loader: 'css-loader', // css-loader reads in a css file as a string
            options: {
              modules: {
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            // postcss is javascript plugin to transform css (https://postcss.org/)
            // postcss-loader process CSS with PostCSS inside Webpack
            loader: 'postcss-loader',
          },
        ],
        include: /\.module\.css$/,
      },
      // css file with extension only .css (global)
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/images/icons/favicon.png',
      inject: true,
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      // agar tidak generate bundle.license.txt file di folder dist
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  performance: {
    maxAssetSize: 300000,
  },
};
