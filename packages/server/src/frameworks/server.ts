import { promises as fs } from 'fs';
import { injectable, inject } from 'inversify';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { TYPES } from '../types';
import { resolvers } from './resolvers';
import { createI18n } from './i18n';
import { Context } from './context';
import { logger } from './logger';

@injectable()
export class Server {
  @inject(TYPES.Context)
  private context: Context;

  async start() {
    const typeDefs = await fs
      .readFile(require.resolve('@visi/schema'), 'utf-8')
      .then(gql);

    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: this.context,
      validationRules: [depthLimit(5)],
    });

    const [i18n] = await createI18n();

    express()
      .use(cors())
      .use(i18nextMiddleware.handle(i18n))
      .use(apollo.getMiddleware({ path: '/api/v1' }))
      .listen({ port: Number(process.env.WEB_PORT) }, this.handleListening);
  }

  private handleListening() {
    logger.info(
      '🎉 GraphQL server is running at ' +
        `http://localhost:${process.env.WEB_PORT}/api/v1`,
    );
  }
}
