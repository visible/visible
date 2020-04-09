import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { promises as fs } from 'fs';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { inject, injectable } from 'inversify';

import { Context } from './context';
import { i18next, initI18next } from './i18next';
import { logger } from './logger';
import { resolvers } from './resolvers';

@injectable()
export class Server {
  @inject(Context)
  private context: Context;

  async start() {
    await initI18next();

    const typeDefs = await fs
      .readFile(require.resolve('@visi/web-schema'), 'utf-8')
      .then(gql);

    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: this.context,
      validationRules: [depthLimit(5)],
    });

    express()
      .use(cors())
      .use(i18nextMiddleware.handle(i18next))
      .use(apollo.getMiddleware({ path: '/api/v1' }))
      .listen({ port: Number(process.env.WEB_PORT) }, this.handleListened);
  }

  private handleListened() {
    logger.info(
      '🎉 GraphQL server is running at ' +
        `http://localhost:${process.env.WEB_PORT}/api/v1`,
    );
  }
}
