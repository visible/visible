require('dotenv').config({ path: '../../.env' });
const path = require('path');
const context = './src/frameworks/database';

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [path.resolve(context, './entities/**/*.ts')],
  migrations: [path.resolve(context, './migrations/**/*.ts')],
  subscribers: [path.resolve(context, './subscribers/**/*.ts')],
  cli: {
    entitiesDir: path.resolve(context, './entities'),
    migrationsDir: path.resolve(context, './migrations'),
    subscribersDir: path.resolve(context, './subscribers'),
  },
};
