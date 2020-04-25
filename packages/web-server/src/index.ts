import 'reflect-metadata';

import { Container } from 'inversify';
import { Connection } from 'typeorm';

import { DiagnosisController } from './adapters/controllers/diagnosis-controller';
import { ReportsController } from './adapters/controllers/reports-controller';
import { CreateDiagnosisInteractor } from './application/interactors/create-diagnosis-interactor';
import { DiagnosisRepository } from './application/repositories/diagnosis-repository';
import { ReportsRepository } from './application/repositories/reports-repository';
import {
  CreateDiagnosisUseCase,
  DeleteDiagnosisUseCase,
  FindDiagnosisUseCase,
  FindReportsByDiagnosisIdUseCase,
} from './application/use-cases';
import { createConnection } from './frameworks/connection';
import { Context } from './frameworks/context';
import {
  DiagnosisLoader,
  DiagnosisLoaderImpl,
} from './frameworks/loaders/diagnosis-loader';
import { DiagnosisRepositoryImpl } from './frameworks/repositories/diagnosis-repository-impl';
import { ReportsRepositoryImpl } from './frameworks/repositories/reports-repository-impl';
import { Server } from './frameworks/server';
import { TYPES } from './types';

// prettier-ignore
(async () => {
  const container = new Container();
  const connection = await createConnection();

  container.bind<DiagnosisRepository>(TYPES.DiagnosisRepository).to(DiagnosisRepositoryImpl);
  container.bind<DiagnosisLoader>(TYPES.DiagnosisLoader).to(DiagnosisLoaderImpl);
  container.bind<ReportsRepository>(TYPES.ReportsRepository).to(ReportsRepositoryImpl);

  container.bind<FindDiagnosis>(FindDiagnosis).toSelf();
  container.bind<CreateDiagnosisUseCase>(CreateDiagnosisInteractor).toSelf();
  container.bind<DeleteDiagnosis>(DeleteDiagnosis).toSelf();
  container.bind<FindReportsByDiagnosisId>(FindReportsByDiagnosisId).toSelf();
  container.bind<DiagnosisController>(DiagnosisController).toSelf();
  container.bind<ReportsController>(ReportsController).toSelf();

  container.bind<Connection>(TYPES.Connection).toConstantValue(connection);
  container.bind<Context>(Context).toSelf();
  container.bind<Server>(Server).toSelf();

  await container.get<Server>(Server).start();
})();
