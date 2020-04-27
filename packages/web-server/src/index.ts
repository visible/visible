import 'reflect-metadata';

import dotenv from 'dotenv';
import { Container } from 'inversify';
import path from 'path';
import { Connection } from 'typeorm';

import { DiagnosisController, ReportsController } from './adapters/controllers';
import {
  CreateDiagnosisInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  FindReportsByDiagnosisIdInteractor,
} from './application/interactors';
import { createConnection } from './frameworks/connection';
import { Context } from './frameworks/context';
import { I18nImpl } from './frameworks/i18n';
import { DiagnosisLoaderImpl } from './frameworks/loaders/diagnosis-loader';
import { LoggerImpl } from './frameworks/logger';
import {
  DiagnosisRepositoryImpl,
  ReportsRepositoryImpl,
} from './frameworks/repositories';
import { Server } from './frameworks/server';
import { TYPES } from './types';

dotenv.config({ path: path.resolve('../../.env') });

// prettier-ignore
(async () => {
  const container = new Container();
  const connection = await createConnection();

  container.bind(TYPES.I18n).to(I18nImpl);
  container.bind(TYPES.Logger).to(LoggerImpl);

  container.bind(TYPES.DiagnosisRepository).to(DiagnosisRepositoryImpl);
  container.bind(TYPES.DiagnosisLoader).to(DiagnosisLoaderImpl);
  container.bind(TYPES.ReportsRepository).to(ReportsRepositoryImpl);

  container.bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor)
  container.bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor)
  container.bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  container.bind(TYPES.FindReportsByDiagnosisIdUseCase).to(FindReportsByDiagnosisIdInteractor);

  container.bind<DiagnosisController>(DiagnosisController).toSelf();
  container.bind<ReportsController>(ReportsController).toSelf();

  container.bind<Connection>(TYPES.Connection).toConstantValue(connection);
  container.bind<Context>(Context).toSelf();
  container.bind<Server>(Server).toSelf();

  await container.get<Server>(Server).start();
})();
