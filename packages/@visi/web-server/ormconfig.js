require('dotenv').config();

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: process.env.NODE_ENV === 'development',
  logging: false,
  entities: ['./dist/interfaces/gateways/**/*-db-entity.js'],
  migrations: ['./dist/frameworks/migrations/**/*.js'],
  // subscribers: [path.resolve(ctx, './subscribers/**/*.js')],
  cli: {
    migrationsDir: './src/frameworks/migrations',
    // entitiesDir: path.resolve(ctx, './interfaces/gateways'),
    // subscribersDir: path.resolve(ctx, './subscribers'),
  },
};
