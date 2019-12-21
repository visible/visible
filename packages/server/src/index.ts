import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import depthLimit from 'graphql-depth-limit';
import i18nextMiddleware from 'i18next-express-middleware';

import { createI18n } from './i18n';

(async () => {
  const apollo = new ApolloServer({
    // typeDefs,
    // resolvers,
    context: {},
    validationRules: [depthLimit(5)],
  });

  const [i18n] = await createI18n();

  const server = express()
    .use(cors())
    .use(i18nextMiddleware.handle(i18n))
    .use(apollo.getMiddleware({ path: '/api/v1' }));

  server.listen({ port: 3000 }, () => {
    // eslint-disable-next-line no-console
    console.log(
      '🎉 GraphQL server is running at ' + `http://localhost:${300}/graphql`,
    );
  });
})();
