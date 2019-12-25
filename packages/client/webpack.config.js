const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

module.exports = (command, argv) => {
  const isProd = argv && argv.mode === 'production';

  const config = {
    context: path.resolve(__dirname, './src'),
    devtool: isProd ? false : 'source-map',
    stats: 'errors-only',

    entry: {
      main: './main.tsx',
    },

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

    plugins: [new webpack.NamedModulesPlugin(), new ManifestPlugin()],

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
  };

  // Development-only plugins
  if (!isProd) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        alwaysWriteToDisk: true,
      }),
      new HtmlWebpackHarddiskPlugin(),
    );
  }

  return config;
};
