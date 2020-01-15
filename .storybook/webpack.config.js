const path = require('path');

// https://storybook.js.org/docs/configurations/typescript-config/#setting-up-typescript-to-work-with-storybook
module.exports = ({ config, mode }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    use: [
      {
        loader: require.resolve('awesome-typescript-loader'),
      },
      {
        loader: require.resolve('react-docgen-typescript-loader'),
      },
    ]
  });

  config.resolve.extensions.push('.ts', '.tsx');

  return config;
};
