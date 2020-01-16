export default {
  stories: ['../packages/ui/src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-knobs',
    '@storybook/addon-docs',
  ],
  webpackFinal: (config: any) => {
    config.resolve.extensions.push('.ts', '.tsx');

    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              targets: {
                browsers: ['>0.25%', 'not ie 11', 'not op_mini all'],
              },
              corejs: 3,
              useBuiltIns: 'usage',
            },
          ],
          '@babel/preset-react',
          '@babel/preset-typescript',
        ],
        plugins: [
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-proposal-class-properties', { loose: true }],
          '@babel/plugin-proposal-json-strings',
          '@babel/plugin-proposal-numeric-separator',
          '@babel/plugin-proposal-nullish-coalescing-operator',
          '@babel/plugin-proposal-optional-chaining',
          '@babel/plugin-syntax-dynamic-import',
          '@babel/plugin-syntax-import-meta',
        ],
      },
    });

    return config;
  },
};
