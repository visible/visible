import 'reflect-metadata';

import { Container } from 'inversify';

import {
  CreateDiagnosisInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  ProcessDiagnosisInteractor,
  SubscribeDiagnosisInteractor,
} from './application/interactors';
import { Translator } from './application/translator';
import { ConfigImpl } from './frameworks/config';
import { createConnection } from './frameworks/connection';
import { ProcessDiagnosisJob, PublishDiagnosisJob } from './frameworks/jobs';
import { Context, Server } from './frameworks/server';
import {
  I18nI18nextImpl,
  LoggerConsoleImpl,
  StorageFsImpl,
} from './frameworks/services';
import { ProcessDiagnosisWorker } from './frameworks/workers';
import { DiagnosisController } from './interfaces/controllers';
import {
  DiagnosisGateway,
  PointersGateway,
  ReportGateway,
  RuleGateway,
  SourceGateway,
} from './interfaces/gateways';
import {
  DiagnosisPresenter,
  PointerPresenter,
  ReportPresenter,
  RulePresenter,
} from './interfaces/presenters';
import { TYPES } from './types';

// prettier-ignore
(async () => {
  const container = new Container();
  const connection = await createConnection();

  container.bind(TYPES.I18n).to(I18nI18nextImpl);
  container.bind(TYPES.Logger).to(LoggerConsoleImpl);
  container.bind(TYPES.Storage).to(StorageFsImpl);

  container.bind(TYPES.DiagnosisRepository).to(DiagnosisGateway);
  container.bind(TYPES.ReportRepository).to(ReportGateway);
  container.bind(TYPES.RuleRepository).to(RuleGateway);
  container.bind(TYPES.PointerRepository).to(PointersGateway);
  container.bind(TYPES.SourceRepository).to(SourceGateway);

  container.bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor)
  container.bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor)
  container.bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  container.bind(TYPES.SubscribeDiagnosisUseCase).to(SubscribeDiagnosisInteractor);
  container.bind(TYPES.ProcessDiagnosisUseCase).to(ProcessDiagnosisInteractor);
  container.bind(Translator).toSelf();

  container.bind(TYPES.Config).to(ConfigImpl).inSingletonScope();
  container.bind(TYPES.Connection).toConstantValue(connection);
  container.bind(TYPES.Context).to(Context);

  container.bind(DiagnosisController).toSelf();
  container.bind(DiagnosisPresenter).toSelf();
  container.bind(ReportPresenter).toSelf();
  container.bind(PointerPresenter).toSelf();
  container.bind(RulePresenter).toSelf();

  container.bind(TYPES.PublishDiagnosisJob).to(PublishDiagnosisJob);
  container.bind(TYPES.ProcessDiagnosisJob).to(ProcessDiagnosisJob);
  container.bind(ProcessDiagnosisWorker).toSelf();

  // Server
  container.bind(Server).toSelf();
  await container.get(Server).start();
  await container.get(ProcessDiagnosisWorker).start();
})();
