import { AsyncContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { ConfigImpl } from '../config';
import { createConnection } from '../connection';
import { ProcessDiagnosisQueueImpl } from '../queues';
import { ContextImpl } from '../server';
import { TranslatorImpl } from '../services/analyzer/translator';
import { VisiblePoolImpl } from '../services/analyzer/visible-pool';
import { ProcessDiagnosisWorker } from '../workers';

export const framework = new AsyncContainerModule(async (bind) => {
  bind(TYPES.Config).to(ConfigImpl);
  bind(TYPES.Connection).toConstantValue(await createConnection());
  bind(TYPES.ProcessDiagnosisQueue).to(ProcessDiagnosisQueueImpl);
  bind(TYPES.VisiblePool).to(VisiblePoolImpl).inSingletonScope();
  bind(TranslatorImpl).toSelf();
  bind(ProcessDiagnosisWorker).toSelf();

  // Context must be initialized for each request
  // https://www.apollographql.com/docs/graphql-tools/connectors
  bind(TYPES.Context).to(ContextImpl).inRequestScope();
});
