import typeDefs from '@visi/web-schema/ast';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import { createServer } from 'http';
import i18nextMiddleware from 'i18next-express-middleware';
import { inject, injectable } from 'inversify';
import { outdent } from 'outdent';
import path from 'path';

import { Logger } from '../../domain/services/logger';
import { TYPES } from '../../types';
import { Config } from '../config';
import { I18nI18nextImpl } from '../services/i18n/i18n-i18next-impl';
import { Context } from './context';
import { resolvers } from './resolvers';

@injectable()
export class Server {
  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,

    @inject(TYPES.Context)
    private readonly context: Context,

    @inject(TYPES.I18n)
    private readonly i18n: I18nI18nextImpl,

    @inject(TYPES.Logger)
    private readonly logger: Logger,
  ) {}

  private handleListen = () => {
    this.logger.info(outdent`
      🎉 GraphQL server is running at:
      ${this.config.getUrl()}/api/v1
    `);
  };

  async start() {
    const app = express();
    const server = createServer(app);

    app
      .use(cors())
      .use(i18nextMiddleware.handle(this.i18n.getI18nextInstance()))
      .use(
        this.config.static.route,
        express.static(path.join(process.cwd(), this.config.static.dir)),
      );

    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: this.context,
      validationRules: [depthLimit(5)],
    });

    apollo.applyMiddleware({ app, path: '/api/v1' });
    apollo.installSubscriptionHandlers(server);
    server.listen({ port: this.config.app.port }, this.handleListen);
  }
}
