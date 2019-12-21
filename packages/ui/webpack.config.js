const path = require('path');

module.exports = (_command, _argv) => {
  const config = {
    context: path.resolve(__dirname, './src'),
    stats: 'errors-only',

    entry: {
      'atoms/badge': './atoms/badge',
      'atoms/button': './atoms/button',
      'atoms/input': './atoms/input',
      'atoms/progress': './atoms/progress',
      'molecules/search': './molecules/search',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, './dist'),
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

  return config;
};
