import { Container } from 'inversify';

import {
  CreateDiagnosisInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  ProcessDiagnosisInteractor,
} from '../application/interactors';
import { ConfigImpl } from '../frameworks/config';
import {
  I18nMock,
  LoggerConsoleImpl,
  MockAnalyzer,
  StorageMock,
} from '../frameworks/services';
import { DiagnosisController } from '../interfaces/controllers';
import { DiagnosisGatewayMock, RuleGatewayMock } from '../interfaces/gateways';
import {
  DiagnosisPresenter,
  LocationPresenter,
  ReportPresenter,
  RulePresenter,
  SourcePresenter,
} from '../interfaces/presenters';
import { TYPES } from '../types';

// prettier-ignore
export const createContainer = (): Container => {
  const container = new Container();

  container.bind(TYPES.Logger).to(LoggerConsoleImpl);
  container.bind(TYPES.I18n).to(I18nMock);
  container.bind(TYPES.Storage).to(StorageMock);
  container.bind(TYPES.Analyzer).to(MockAnalyzer);

  container.bind(TYPES.DiagnosisRepository).to(DiagnosisGatewayMock).inSingletonScope();
  container.bind(TYPES.RuleRepository).to(RuleGatewayMock).inSingletonScope();

  container.bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor);
  container.bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor);
  container.bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  container.bind(TYPES.ProcessDiagnosisUseCase).to(ProcessDiagnosisInteractor);

  container.bind(TYPES.Config).to(ConfigImpl).inSingletonScope();

  container.bind(DiagnosisController).toSelf();
  container.bind(DiagnosisPresenter).toSelf();
  container.bind(LocationPresenter).toSelf();
  container.bind(ReportPresenter).toSelf();
  container.bind(RulePresenter).toSelf();
  container.bind(SourcePresenter).toSelf();

  return container;
};
