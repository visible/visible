const path = require('path');

module.exports = () => {
  return {
    context: path.resolve(__dirname, './src'),
    devtool: 'source-map',
    stats: 'errors-only',

    entry: {
      localize: './renderer/localize.ts',
      'base-rule': './renderer/base-rule.ts',
      'run-rule': './renderer/run-rule.ts',
    },

    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, './dist/renderer'),
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },

    resolve: {
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
  };
};
