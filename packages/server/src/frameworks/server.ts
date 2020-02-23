import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { inject, injectable } from 'inversify';

import { Context } from './context';
import { createI18n } from './i18n';
import { logger } from './logger';
import { resolvers } from './resolvers';
import { routes } from './routes';

@injectable()
export class Server {
  @inject(Context)
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
      .use(routes)
      .listen({ port: Number(process.env.WEB_PORT) }, this.handleListened);
  }

  private handleListened() {
    logger.info(
      '🎉 GraphQL server is running at ' +
        `http://localhost:${process.env.WEB_PORT}/api/v1`,
    );
  }
}
