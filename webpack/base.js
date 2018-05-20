const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const resolvePath = (value) => path.resolve(__dirname, value);

module.exports = (env) => {
  const isProd = env === 'prod';
  console.log('[ACTUAL DIR]', __dirname);
  return {
    // define where our source files come from and what the output looks like
    entry: resolvePath('../src/index'),

    // files that should be resolved by webpack
    resolve: {
      alias: {
        components: resolvePath('../src/components'),
        config: resolvePath('../src/config'),
        core: resolvePath('../src/core'),
        services: resolvePath('../src/services'),
      },
      extensions: ['.ts', '.tsx', '.js', '.json', '.jsx', '.scss'],
    },

    // the loaders
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
        },
        {
          test: /\.scss$/,
          loaders: ['style-loader', 'css-loader', 'sass-loader'],
        },
      ],
    },

    // plugins
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        production: isProd,
        minify: isProd && {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
    ],
  };
};
