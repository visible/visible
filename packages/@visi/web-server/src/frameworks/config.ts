import { injectable } from 'inversify';
import path from 'path';

export interface HttpConfig {
  readonly baseUrl: string;
}

export interface GraphqlConfig {
  readonly pathname: string;
}

export interface WsConfig {
  readonly baseUrl: string;
}

export interface StaticConfig {
  readonly dir: string;
  readonly pathname: string;
}

// export interface DbConfig {
//   host: string;
//   name: string;
//   port: number;
//   username: string;
//   password: string;
// }

export interface RedisConfig {
  readonly host: string;
  readonly port: number;
  readonly password: string;
}

export interface CloudStorageConfig {
  readonly bucket?: string;
}

export interface DiagnosisWorker {
  readonly concurrency: number;
}

export interface Config {
  readonly port: number;
  readonly http: HttpConfig;
  readonly ws: WsConfig;
  readonly graphql: GraphqlConfig;
  readonly static: StaticConfig;
  readonly redis: RedisConfig;
  readonly cloudStorage: CloudStorageConfig;
  readonly diagnosisWorker: DiagnosisWorker;
  // db: DbConfig;
  getStaticUrl(): string;
  getGraphqlUrl(): string;
  getGraphqlSubscriptionUrl(): string;
}

@injectable()
export class ConfigImpl implements Config {
  readonly port = Number(process.env.PORT);

  readonly static = {
    pathname: '/static',
    dir: path.join(process.cwd(), 'static'),
  };

  readonly graphql = {
    pathname: '/api/v1',
  };

  readonly http = {
    baseUrl: process.env.HTTP_BASE_URL ?? 'http://localhost:3000',
  };

  readonly ws = {
    baseUrl: process.env.WS_BASE_URL ?? 'ws://localhost:3000',
  };

  // db = {
  //   host: process.env.DB_HOST ?? 'localhost',
  //   name: process.env.DB_NAME ?? 'visible',
  //   port: Number(process.env.DB_PORT) ?? 5432,
  //   username: process.env.DB_USERNAME ?? 'visible',
  //   password: process.env.DB_PASSWORD ?? '',
  // };

  readonly redis = {
    host: process.env.REDIS_HOST ?? 'localhost',
    port: Number(process.env.REDIS_PORT) ?? 6379,
    password: process.env.REDIS_PASSWORD ?? '',
  };

  readonly cloudStorage = {
    bucket: process.env.CLOUD_STORAGE_BUCKET,
  };

  readonly diagnosisWorker = {
    concurrency: Number(process.env.DIAGNOSIS_WORKER_CONCURRENCY) ?? 1,
  };

  getGraphqlUrl(): string {
    const url = new URL(this.http.baseUrl);
    url.pathname = this.graphql.pathname;
    return url.toString();
  }

  getGraphqlSubscriptionUrl(): string {
    const url = new URL(this.ws.baseUrl);
    url.pathname = this.graphql.pathname;
    return url.toString();
  }

  getStaticUrl(): string {
    const url = new URL(this.http.baseUrl);
    url.pathname = this.static.pathname;
    return url.toString();
  }
}
