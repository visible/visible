import 'reflect-metadata';
import { Container } from 'inversify';
import { Connection } from 'typeorm';
import { TYPES } from './types';

import { DiagnosisRepository } from './application/repositories/diagnosis-repository';
import { ReportsRepository } from './application/repositories/reports-repository';
import { DiagnosisWorker } from './application/workers/diagnosis-worker';

import { DiagnosisController } from './adapters/controllers/diagnosis-controller';
import { ReportsController } from './adapters/controllers/reports-controller';
import { FindDiagnosis } from './application/use-cases/find-diagnosis';
import { CreateDiagnosis } from './application/use-cases/create-diagnosis';
import { DeleteDiagnosis } from './application/use-cases/delete-diagnosis';
import { FindReportsByDiagnosisId } from './application/use-cases/find-reports-by-diagnosis-id';

import { Server } from './frameworks/server';
import { Context } from './frameworks/context';
import { createConnection } from './frameworks/database/connection';
import { DiagnosisRepositoryImpl } from './frameworks/database/repositories/diagnosis-repository-impl';
import { ReportsRepositoryImpl } from './frameworks/database/repositories/reports-repository-impl';
import {
  DiagnosisLoader,
  DiagnosisLoaderImpl,
} from './frameworks/database/loaders/diagnosis-loader';
import { DiagnosisWorkerImpl } from './frameworks/workers/diagnosis-worker-impl';

// prettier-ignore
(async () => {
  const container = new Container();
  const connection = await createConnection();

  container.bind<DiagnosisRepository>(TYPES.DiagnosisRepository).to(DiagnosisRepositoryImpl);
  container.bind<DiagnosisLoader>(TYPES.DiagnosisLoader).to(DiagnosisLoaderImpl);
  container.bind<ReportsRepository>(TYPES.ReportsRepository).to(ReportsRepositoryImpl);
  container.bind<DiagnosisWorker>(TYPES.DiagnosisWorker).to(DiagnosisWorkerImpl);

  container.bind<FindDiagnosis>(FindDiagnosis).toSelf();
  container.bind<CreateDiagnosis>(CreateDiagnosis).toSelf();
  container.bind<DeleteDiagnosis>(DeleteDiagnosis).toSelf();
  container.bind<FindReportsByDiagnosisId>(FindReportsByDiagnosisId).toSelf();
  container.bind<DiagnosisController>(DiagnosisController).toSelf();
  container.bind<ReportsController>(ReportsController).toSelf();


  container.bind<Connection>(TYPES.Connection).toConstantValue(connection);
  container.bind<Context>(Context).toSelf();
  container.bind<Server>(Server).toSelf();

  await container.get<Server>(Server).start();
})();
