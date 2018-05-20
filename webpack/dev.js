const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const PORT = 9001;

const resolvePath = (dir) => path.resolve(__dirname, dir);

module.exports = (env) => {
  const configBase = require('./base')(env);

  return merge(configBase, {
    mode: 'development',
    // define where our source files come from and what the output looks like
    output: {
      path: resolvePath('../build'),
      filename: '[name]-[hash:8].js',
    },
    // source-map configuration
    devtool: 'inline-source-map',
    devServer: {
      hot: true,
      historyApiFallback: true,
      compress: true,
      port: PORT,
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.DefinePlugin({
        __DEV__: true,
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
};
