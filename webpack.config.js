const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'imagenes/[name][ext]'
        }
      }
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new HtmlMinimizerPlugin(),
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    // Configuración para cada una de tus 4 páginas independientes
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/fasedegrupos.html',
      filename: 'fasedegrupos.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/sedes.html',
      filename: 'sedes.html',
      inject: 'body',
    }),
    new HtmlWebpackPlugin({
      template: './src/registro.html',
      filename: 'registro.html',
      inject: 'body',
    }),
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  devServer: {
    static: './dist',
    port: 3000,
    open: true,
    hot: true,
  },
};