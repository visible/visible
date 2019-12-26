const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/entity/**/*.ts'],
  migrations: ['./src/migration/**/*.ts'],
  subscribers: ['./src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: './src/entity',
    migrationsDir: './src/migration',
    subscribersDir: './src/subscriber',
  },
};
