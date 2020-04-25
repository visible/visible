require('dotenv').config({ path: '../../.env' });
const path = require('path');
const ctx = './dist/frameworks';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.resolve(ctx, './entities/**/*.js')],
  migrations: [path.resolve(ctx, './migrations/**/*.js')],
  subscribers: [path.resolve(ctx, './subscribers/**/*.js')],
  cli: {
    entitiesDir: path.resolve(ctx, './entities'),
    migrationsDir: path.resolve(ctx, './migrations'),
    subscribersDir: path.resolve(ctx, './subscribers'),
  },
};
