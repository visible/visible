import dotenv from 'dotenv';
import { injectable } from 'inversify';
import path from 'path';

export interface AppConfig {
  protocol: string;
  host: string;
  port: number;
}

export interface StaticConfig {
  route: string;
  dir: string;
}

export interface DbConfig {
  host: string;
  name: string;
  port: number;
  username: string;
  password: string;
}

export interface RedisConfig {
  host: string;
  port: number;
  password: string;
}

export interface Config {
  app: AppConfig;
  static: StaticConfig;
  db: DbConfig;
  redis: RedisConfig;
  getUrl(): string;
}

@injectable()
export class ConfigImpl implements Config {
  app: AppConfig;
  static: StaticConfig;
  db: DbConfig;
  redis: RedisConfig;

  constructor(envPath = path.resolve('../../.env')) {
    dotenv.config({ path: envPath });
    const e = process.env;

    this.app = {
      protocol: 'http',
      host: e.APP_HOST ?? 'localhost',
      port: Number(e.APP_PORT) ?? 3000,
    };

    this.static = {
      route: 'static',
      dir: path.join(process.cwd(), 'static'),
    };

    this.db = {
      host: e.DB_HOST ?? 'localhost',
      name: e.DB_NAME ?? 'visible',
      port: Number(e.DB_PORT) ?? 5432,
      username: e.DB_USERNAME ?? 'visible',
      password: e.DB_PASSWORD ?? '',
    };

    this.redis = {
      host: e.REDIS_HOST ?? 'localhost',
      port: Number(e.REDIS_PORT) ?? 6379,
      password: e.REDIS_PASSWORD ?? '',
    };
  }

  getUrl() {
    return `${this.app.protocol}://${this.app.host}:${this.app.port}`;
  }
}
