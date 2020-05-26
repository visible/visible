import { CodeFileLoader } from '@graphql-tools/code-file-loader';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchema } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
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

  private loadSchema = async () => {
    const glob = path.join(
      path.resolve(require.resolve('@visi/web-schema'), '..'),
      '**/*.graphql',
    );

    // Load .graphql as an AST
    const schema = await loadSchema(glob, {
      loaders: [new GraphQLFileLoader(), new CodeFileLoader()],
    });

    return addResolversToSchema({
      schema,
      resolvers,
    });
  };

  async start() {
    const app = express();
    const server = createServer(app);

    const i18nMiddleware = i18nextMiddleware.handle(
      this.i18n.getI18nextInstance(),
    );

    const staticMiddleware = express.static(
      path.join(process.cwd(), this.config.static.dir),
    );

    app
      .use(cors())
      .use(i18nMiddleware)
      .use(this.config.static.route, staticMiddleware);

    const apollo = new ApolloServer({
      schema: await this.loadSchema(),
      context: this.context,
      validationRules: [depthLimit(5)],
    });

    apollo.applyMiddleware({ app, path: '/api/v1' });
    apollo.installSubscriptionHandlers(server);

    server.listen({ port: this.config.app.port }, () => {
      this.logger.info(outdent`
        🎉 Visible GraphQL server is running at:
        ${this.config.getUrl()}/${apollo.graphqlPath}
      `);
    });
  }
}
