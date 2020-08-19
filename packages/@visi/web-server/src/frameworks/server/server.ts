import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import depthLimit from 'graphql-depth-limit';
import gql from 'graphql-tag';
import { createServer } from 'http';
import i18nextMiddleware from 'i18next-express-middleware';
import { Container } from 'inversify';
import { outdent } from 'outdent';
import path from 'path';

import { Logger } from '../../domain/services';
import { TYPES } from '../../types';
import { Config } from '../config';
import { I18nI18nextImpl } from '../services';
import { resolvers } from './resolvers';

export class Server {
  private readonly i18n: I18nI18nextImpl;
  private readonly config: Config;
  private readonly logger: Logger;

  constructor(private readonly container: Container) {
    this.i18n = container.get(TYPES.I18n);
    this.config = container.get(TYPES.Config);
    this.logger = container.get(TYPES.Logger);
  }

  async start(): Promise<void> {
    const app = express();
    const server = createServer(app);

    const i18nMiddleware = i18nextMiddleware.handle(
      this.i18n.getI18nextInstance(),
    );

    const staticMiddleware = express.static(this.config.static.dir);

    app
      .use(cors())
      .use(i18nMiddleware)
      .use(this.config.static.route, staticMiddleware);

    const apollo = new ApolloServer({
      typeDefs: await this.loadSchema(),
      resolvers,
      context: () => {
        return this.container.get(TYPES.Context);
      },
      validationRules: [depthLimit(5)],
      subscriptions: {
        path: '/api/v1',
      },
    });

    apollo.applyMiddleware({ app, path: '/api/v1' });
    apollo.installSubscriptionHandlers(server);

    server.listen({ port: this.config.app.port }, () => {
      this.logger.info(outdent`
        🎉 Visible GraphQL server is running at:
        ${this.config.getUrl()}${apollo.graphqlPath}
        ${this.config.getSocketUrl()}${apollo.subscriptionsPath}
      `);
    });
  }

  private async loadSchema() {
    return fs
      .readFile(path.resolve(require.resolve('@visi/web-schema')), 'utf-8')
      .then((code) => gql(code));
  }
}
