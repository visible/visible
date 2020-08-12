import { AsyncContainerModule } from 'inversify';

import { ConfigImpl } from '../frameworks/config';
import { createConnection } from '../frameworks/connection';
import { ProcessDiagnosisQueueImpl } from '../frameworks/queues';
import { ContextImpl } from '../frameworks/server';
import { ProcessDiagnosisWorker } from '../frameworks/workers';
import { TYPES } from '../types';

export const framework = new AsyncContainerModule(async (bind) => {
  bind(TYPES.Config).to(ConfigImpl);
  bind(TYPES.Connection).toConstantValue(await createConnection());
  bind(TYPES.ProcessDiagnosisQueue).to(ProcessDiagnosisQueueImpl);
  bind(ProcessDiagnosisWorker).toSelf();

  // Context must be initialized for each request
  // https://www.apollographql.com/docs/graphql-tools/connectors
  bind(TYPES.Context).to(ContextImpl).inRequestScope();
});