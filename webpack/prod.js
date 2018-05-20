const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./base.js');

const resolvePath = (dir) => path.resolve(__dirname, dir);

module.exports = (env) => {
  const configBase = require('./base')(env);

  return merge(baseConfig, {
    mode: 'production',
    // define where our source files come from and what the output looks like
    output: {
      path: resolvePath('../build'),
      filename: '[name].js',
      publicPath: '/',
      pathinfo: false,
    },
    plugins: [
      new UglifyJsPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.DefinePlugin({
        __DEV__: false,
      }),
    ],
  });
};
