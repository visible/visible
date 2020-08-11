import path from 'path';
import {
  Connection,
  ConnectionOptionsReader,
  createConnection as defaultCreateConnection,
} from 'typeorm';

// Workaround for TypeORM + Monorepo issue:
// https://github.com/inxilpro/node-app-root-path/issues/31#issuecomment-439739607
// We use this technique because we also want to use TypeORM from the CLI
export const createConnection = async (): Promise<Connection> => {
  // When you invoke JS through `yarn workspace <ws> run` you'll get
  // the leaf's dir from `process.cwd()`
  // i.e `<your project dir>/packages/server` in this case.
  const cwd = process.cwd();
  const ctx = './dist';

  const connectionOptionsReader = new ConnectionOptionsReader({ root: cwd });
  const connectionOptions = await connectionOptionsReader.get('default');

  const connection = await defaultCreateConnection({
    ...connectionOptions,
    entities: [path.join(cwd, ctx, './interfaces/gateways/**/*-table.js')],
    migrations: [path.join(cwd, ctx, './migrations/**/*.js')],
    subscribers: [path.join(cwd, ctx, './subscribers/**/*.js')],
  });

  return connection;
};
