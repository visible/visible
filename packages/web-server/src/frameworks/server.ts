import typeDefs from '@visi/web-schema/ast';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { inject, injectable } from 'inversify';

import { Logger } from '../domain/services/logger';
import { TYPES } from '../types';
import { Context } from './context';
import { I18nImpl } from './i18n';
import { resolvers } from './resolvers';

@injectable()
export class Server {
  @inject(Context)
  private readonly context: Context;

  @inject(TYPES.I18n)
  private readonly i18n: I18nImpl;

  @inject(TYPES.Logger)
  private readonly logger: Logger;

  private handleListen = () => {
    this.logger.info(
      '🎉 GraphQL server is running at ' +
        `http://localhost:${process.env.SERVER_PORT}/api/v1`,
    );
  };

  async start() {
    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: this.context,
      validationRules: [depthLimit(5)],
    });

    return express()
      .use(cors())
      .use(i18nextMiddleware.handle(this.i18n.getI18nextInstance()))
      .use(apollo.getMiddleware({ path: '/api/v1' }))
      .listen({ port: Number(process.env.SERVER_PORT) }, this.handleListen);
  }
}
