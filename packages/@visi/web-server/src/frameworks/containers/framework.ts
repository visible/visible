import { AsyncContainerModule } from 'inversify';

import { TYPES } from '../../types';
import { createConnection, RedisConnector } from '../connection';
import { ProcessDiagnosisQueueImpl } from '../queues';
import { ContextImpl } from '../server';
import { TranslatorImpl } from '../services/analyzer/translator';
import { VisiblePoolImpl } from '../services/analyzer/visible-pool';
import { ProcessDiagnosisWorker } from '../workers';

export const framework = (
  redisConnector: RedisConnector,
): AsyncContainerModule =>
  new AsyncContainerModule(async (bind) => {
    bind(TYPES.Connection).toConstantValue(await createConnection());
    bind(TYPES.Redis).toConstantValue(await redisConnector.connect());

    // @visi/core
    bind(TYPES.VisiblePool).to(VisiblePoolImpl).inSingletonScope();
    bind(TranslatorImpl).toSelf();

    // Bull
    bind(ProcessDiagnosisWorker).toSelf();
    bind(TYPES.ProcessDiagnosisQueue).to(ProcessDiagnosisQueueImpl);

    // Context must be initialized for each request
    // https://www.apollographql.com/docs/graphql-tools/connectors
    bind(TYPES.Context).to(ContextImpl).inRequestScope();
  });
