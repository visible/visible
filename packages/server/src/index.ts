import 'reflect-metadata';
import { Container } from 'inversify';
import { Connection } from 'typeorm';
import { TYPES } from './types';

import { DiagnosisRepository } from './application/repositories/diagnosis-repository';
import { ReportsRepository } from './application/repositories/reports-repository';

import { DiagnosisController } from './adapters/controllers/diagnosis-controller';
import { ReportsController } from './adapters/controllers/reports-controller';

import { Server } from './frameworks/server';
import { Context } from './frameworks/context';
import { createConnection } from './frameworks/database/connection';
import { DiagnosisRepositoryImpl } from './frameworks/database/repositories/diagnosis-repository-impl';
import { ReportsRepositoryImpl } from './frameworks/database/repositories/reports-repository-impl';

// prettier-ignore
(async () => {
  const container = new Container();
  const connection = await createConnection();

  container.bind<Connection>(TYPES.Connection).toConstantValue(connection);
  container.bind<Server>(TYPES.Server).to(Server);
  container.bind<Context>(TYPES.Context).to(Context);
  container.bind<DiagnosisRepository>(TYPES.DiagnosisRepository).to(DiagnosisRepositoryImpl);
  container.bind<ReportsRepository>(TYPES.ReportsRepository).to(ReportsRepositoryImpl);
  container.bind<DiagnosisController>(TYPES.DiagnosisController).to(DiagnosisController);
  container.bind<ReportsController>(TYPES.ReportsController).to(ReportsController);

  await container.get<Server>(TYPES.Server).start();
})();
