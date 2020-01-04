const { visible } = require('./dist/main/index.js');

const reuslt = visible({
  url: 'https://fsn4x.csb.app/',
  config: {
    extends: ['@visi/plugin-standard'],
    settings: {
      headless: false,
    },
  },
});

reuslt.then(a => console.log(a));
