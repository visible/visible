const { visible } = require('./dist/visible.js');

const reuslt = visible({
  url: 'https://fsn4x.csb.app/',
  config: {
    extends: [],
    plugins: ['@visi/plugin-standard'],
    rules: {
      'img-alt': {
        use: true,
      },
      'button-alt': {
        use: true,
      },
    },
  },
});

reuslt.then(a => console.log(a));
