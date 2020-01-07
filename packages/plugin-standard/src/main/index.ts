import { PluginMain } from '@visi/core/main';

const plugin: PluginMain = {
  config: {
    plugins: ['@visi/plugin-standard'],
    rules: {
      'button-alt': {
        use: true,
        level: 'error',
        options: {},
      },
      'color-contrast': {
        use: true,
        level: 'error',
        options: {},
      },
      'img-alt': {
        use: true,
        level: 'error',
        options: {},
      },
    },
  },
};

export default plugin;
