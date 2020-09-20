import { AsyncContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { ConfigImpl } from '../config';
import { createConnection } from '../connection';
import { ProcessDiagnosisQueueImpl } from '../queues';
import { ContextImpl } from '../server';
import { TranslatorImpl } from '../services/analyzer/translator';
import { ProcessDiagnosisWorker } from '../workers';
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
