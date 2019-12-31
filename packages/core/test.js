const { visible } = require('./dist/visible.js');

const reuslt = visible({
  config: {
    extends: [],
    plugins: ['../../plugin-standard'],
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
