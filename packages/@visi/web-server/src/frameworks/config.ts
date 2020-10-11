import { injectable } from 'inversify';
import path from 'path';

export interface AppConfig {
  protocol: string;
  host: string;
  port: number;
  url: string;
}

export interface SocketConfig {
  protocol: string;
  host: string;
  port: number;
  url: string;
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

export interface CloudStorageConfig {
  bucket?: string;
}

export interface Config {
  app: AppConfig;
  socket: SocketConfig;
  static: StaticConfig;
  db: DbConfig;
  redis: RedisConfig;
  cloudStorage: CloudStorageConfig;
  diagnosisConcurrency: number;
  getUrl(): string;
  getSocketUrl(): string;
  getStaticUrl(): string;
}

@injectable()
export class ConfigImpl implements Config {
  static = {
    route: '/static',
    dir: path.join(process.cwd(), 'static'),
  };

  app = {
    protocol: 'http',
    host: process.env.APP_HOST ?? 'localhost',
    port: Number(process.env.APP_PORT) ?? 3000,
    url: process.env.API_URL ?? 'http://localhost',
  };

  socket = {
    protocol: 'ws',
    host: process.env.APP_HOST ?? 'localhost',
    port: Number(process.env.APP_PORT) ?? 3000,
    url: process.env.STREAMING_API_URL ?? 'ws://localhost',
  };

  db = {
    host: process.env.DB_HOST ?? 'localhost',
    name: process.env.DB_NAME ?? 'visible',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME ?? 'visible',
    password: process.env.DB_PASSWORD ?? '',
  };

  redis = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) ?? 6379,
    password: process.env.REDIS_PASSWORD ?? '',
  };

  cloudStorage = {
    bucket: process.env.CLOUD_STORAGE_BUCKET,
  };

  diagnosisConcurrency = Number(process.env.DIAGNOSIS_CONCURRENCY) ?? 1;

  getUrl(): string {
    return this.app.url;
  }

  getSocketUrl(): string {
    return this.socket.url;
  }

  getStaticUrl(): string {
    return `${this.getUrl()}${this.static.route}`;
  }
}
