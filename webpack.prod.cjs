const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin")
const ESLintPlugin = require('eslint-webpack-plugin')

module.exports = {
  mode: 'production',
  target: 'browserslist',

  entry: {
    main: path.resolve(__dirname, 'src', 'index.js')
  },

  devtool: 'source-map',

  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].[contenthash].js',
    clean: true,
  },

  devServer: {
    hot: true,
    open: true,
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true
    }
  },

  optimization: {
    splitChunks: {
      chunks: 'all'
    },
    minimizer: [
      new CssMinimizerPlugin(),
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body'
    }),
    new ESLintPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif|webp|ico)$/,
        type: 'asset',
        generator: {
          filename: 'images/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]'
        }
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
          }
        }
      },
    ]
  }
}