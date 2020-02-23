require('dotenv').config({ path: '../../.env' });
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

const shared = (command, argv) => {
  const isProd = argv && argv.mode === 'production';

  const config = {
    context: path.resolve(__dirname, './src'),
    devtool: isProd ? false : 'source-map',
    stats: 'errors-only',

    output: {
      filename: isProd ? '[name]-[hash].js' : '[name].js',
      chunkFilename: isProd ? '[name]-[hash].js' : '[name].js',
      path: path.resolve(__dirname, './dist'),
      publicPath: '/dist/',
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /.(graphql|gql)$/,
          exclude: /node_modules/,
          use: 'graphql-tag/loader',
        },
        {
          test: /\.(css)$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|otf|eot|svg|woff(2)?)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: isProd ? '[name]-[hash].[ext]' : '[name].[ext]',
                path: path.resolve(__dirname, './dist'),
                publicPath: '/dist/',
              },
            },
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },

    plugins: [new webpack.NamedModulesPlugin()],
  };

  return config;
};

const ssr = (command, argv) => {
  const config = {
    target: 'node',

    entry: {
      ssr: './ssr.tsx',
    },

    output: {
      filename: '[name].js',
      library: '@visi/client',
      libraryTarget: 'umd',
      libraryExport: 'default',
    },
  };

  return merge(shared(command, argv), config);
};

const main = (command, argv) => {
  const isProd = argv && argv.mode === 'production';

  const config = {
    entry: {
      main: './main.tsx',
    },

    devServer: {
      compress: true,
      overlay: true,
      contentBase: path.resolve(__dirname, './dist'),
      disableHostCheck: true,
      historyApiFallback: {
        index: '/index.html',
      },
      hot: true,
      inline: true,
      open: true,
      port: 8080,
      stats: 'errors-only',
      watchOptions: {
        ignored: /node_modules/,
      },
      proxy: [
        {
          // Proxy GraphQL endpoints
          context: ['/api/v1'],
          target: `http://localhost:3000`,
        },
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          PUBLIC_URL: JSON.stringify(process.env.PUBLIC_URL),
        },
      }),
      new ManifestPlugin(),
    ],
  };

  if (!isProd) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/debug.html'),
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin(),
    );
  }

  return merge(shared(command, argv), config);
};

module.exports = [main, ssr];
