const { visible } = require('./dist/main/index.js');

const result = visible({
  url: 'https://fsn4x.csb.app/',
  config: {
    extends: ['@visi/plugin-standard'],
    settings: {
      browser: 'firefox',
      headless: false,
    },
  },
});

result.then(a => console.log(a));
