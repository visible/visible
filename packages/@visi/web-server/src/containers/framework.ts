import { AsyncContainerModule } from 'inversify';

import { ConfigImpl } from '../frameworks/config';
import { createConnection } from '../frameworks/connection';
import { ProcessDiagnosisQueueImpl } from '../frameworks/queues';
import { ContextImpl } from '../frameworks/server';
import { TranslatorImpl } from '../frameworks/services/analyzer/translator';
import { ProcessDiagnosisWorker } from '../frameworks/workers';
import { TYPES } from '../types';
import { factory } from './visible-factory';

export const framework = new AsyncContainerModule(async (bind) => {
  const visible = await factory();

  bind(TYPES.Config).to(ConfigImpl);
  bind(TYPES.Connection).toConstantValue(await createConnection());
  bind(TYPES.ProcessDiagnosisQueue).to(ProcessDiagnosisQueueImpl);
  bind(TYPES.Visible).toConstantValue(visible);
  bind(TranslatorImpl).toSelf();
  bind(ProcessDiagnosisWorker).toSelf();

  // Context must be initialized for each request
  // https://www.apollographql.com/docs/graphql-tools/connectors
  bind(TYPES.Context).to(ContextImpl).inRequestScope();
});
