module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/frameworks/database/entities/**/*.ts'],
  migrations: ['./src/frameworks/database/migrations/**/*.ts'],
  subscribers: ['./src/frameworks/database/subscribers/**/*.ts'],
  cli: {
    entitiesDir: './src/frameworks/database/entities',
    migrationsDir: './src/frameworks/database/migrations',
    subscribersDir: './src/frameworks/database/subscribers',
  },
};
