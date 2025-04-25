import webpack from 'webpack';
import * as webpackDevServer from 'webpack-dev-server';
import path from 'node:path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

const config: webpack.Configuration = {
  mode: 'production',
  entry: './src/js/index.tsx',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/site/index.html',
    }),
  ],
  optimization: {
    usedExports: true,
  },
  performance: {
    hints: false,
  },
};

export default config;
