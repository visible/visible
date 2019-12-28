import 'reflect-metadata';
import { promises as fs } from 'fs';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { resolvers } from './resolvers';
import { createI18n } from './i18n';
import { createConnection } from './database/connection';
import { createContext } from './context';
import { logger } from './logger';

dotenv.config({ path: '../.env' });

export class Server {
  async init() {
    const connection = await createConnection();

    const typeDefs = await fs
      .readFile(require.resolve('@visi/schema'), 'utf-8')
      .then(gql);

    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: () => createContext(connection),
      validationRules: [depthLimit(5)],
    });

    const [i18n] = await createI18n();

    express()
      .use(cors())
      .use(i18nextMiddleware.handle(i18n))
      .use(apollo.getMiddleware({ path: '/api/v1' }))
      .listen({ port: Number(process.env.WEB_PORT) }, this.handleListening);
  }

  handleListening() {
    logger.info(
      '🎉 GraphQL server is running at ' +
        `http://localhost:${process.env.WEB_PORT}/api/v1`,
    );
  }
}
