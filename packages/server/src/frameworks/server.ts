import { promises as fs } from 'fs';
import express from 'express';
import cors from 'cors';
import { ApolloServer, gql } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';
import { resolvers } from './resolvers';
import { createI18n } from './i18n';
import { createConnection } from './database/connection';
import { createContext } from './context';
import { injectDependencies } from './inversify';

export class Server {
  async init() {
    const connection = await createConnection();
    injectDependencies(connection);

    const typeDefs = await fs
      .readFile(require.resolve('@visi/schema'), 'utf-8')
      .then(gql);

    const apollo = new ApolloServer({
      resolvers,
      typeDefs,
      context: createContext,
      validationRules: [depthLimit(5)],
    });

    const [i18n] = await createI18n();

    express()
      .use(cors())
      .use(i18nextMiddleware.handle(i18n))
      .use(apollo.getMiddleware({ path: '/api/v1' }))
      .listen({ port: 3000 }, this.handleListening);
  }

  handleListening() {
    // eslint-disable-next-line no-console
    console.log(
      '🎉 GraphQL server is running at ' + `http://localhost:${3000}/api/v1`,
    );
  }
}
