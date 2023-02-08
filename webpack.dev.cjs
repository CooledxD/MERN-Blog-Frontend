const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = {
  mode: 'development',
  
  target: 'browserslist',

  entry: {
    main: path.resolve(__dirname, 'src', 'index.js')
  },

  devtool: 'eval-source-map',

  output: {
    publicPath: '/'
  },

  devServer: {
    hot: true,
    open: true,
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'src'),
      watch: true,
    }
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html'),
      inject: 'body'
    }),
    new ESLintPlugin(),
    new Dotenv(),
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
          filename: 'images/[name].[ext]'
        }
      },
      {
        test: /\.woff2$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[ext]'
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