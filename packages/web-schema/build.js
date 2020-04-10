const { promises: fs } = require('fs');
const path = require('path');

const noOp = () => {
  /* */
};

(async () => {
  const ctx = '.';
  const paths = {
    schema: path.resolve(ctx, 'schema.graphql'),
    dir: path.resolve(ctx, 'dist'),
    file: path.resolve(ctx, 'dist/type-defs.js'),
  };

  await fs.unlink(paths.file).catch(noOp);
  const schema = await fs.readFile(paths.schema, 'utf-8');

  const js = `
    const gql = require('graphql-tag');
    module.exports = { typeDefs: gql\`${schema}\` };
  `;

  await fs.mkdir(paths.dir).catch(noOp);
  await fs.writeFile(paths.file, js, 'utf-8');
})();
