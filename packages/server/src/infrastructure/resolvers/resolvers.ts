import { Resolvers } from '../generated/graphql';
import { DiagnosticsController } from '../../adapters/controllers/diagnostics-controller';

export const resolvers: Resolvers = {
  Mutation: {
    diagnoseURL: async (_parent, { url }, _context) => {
      return new DiagnosticsController((context as any).conenction).diagnoseURL(
        url,
      );
    },
  },
};
