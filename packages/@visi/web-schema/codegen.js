const path = require('path');

module.exports = {
  overwrite: true,
  schema: path.resolve('./src/**/*.graphql'),
  generates: {
    './dist/schema.graphql': {
      plugins: ['schema-ast'],
    },
  },
};
