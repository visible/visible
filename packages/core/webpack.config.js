const path = require('path');

module.exports = () => {
  return {
    context: path.resolve(__dirname, './src'),
    devtool: 'source-map',
    stats: 'errors-only',

    entry: {
      'run-rule': './renderer/run-rule.ts',
    },

    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      path: path.resolve(__dirname, './embed'),
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
