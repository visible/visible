import { Container } from 'inversify';

import {
  CreateDiagnosisInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  ProcessDiagnosisInteractor,
} from '../application/interactors';
import { Translator } from '../application/translator';
import { ConfigImpl } from '../frameworks/config';
import {
  I18nMock,
  LoggerConsoleImpl,
  StorageMock,
} from '../frameworks/services';
import { DiagnosisController } from '../interfaces/controllers';
import {
  DiagnosisGatewayMock,
  PointerGatewayMock,
  ReportGatewayMock,
  RuleGatewayMock,
  SourceGatewayMock,
} from '../interfaces/gateways';
import {
  DiagnosisPresenter,
  PointerPresenter,
  ReportPresenter,
  RulePresenter,
} from '../interfaces/presenters';
import { TYPES } from '../types';

// prettier-ignore
export const createContainer = (): Container => {
  const container = new Container();

  container.bind(TYPES.Logger).to(LoggerConsoleImpl);
  container.bind(TYPES.I18n).to(I18nMock);
  container.bind(TYPES.Storage).to(StorageMock);

  container.bind(TYPES.DiagnosisRepository).to(DiagnosisGatewayMock).inSingletonScope();
  container.bind(TYPES.RuleRepository).to(RuleGatewayMock).inSingletonScope();
  container.bind(TYPES.ReportRepository).to(ReportGatewayMock).inSingletonScope();
  container.bind(TYPES.PointerRepository).to(PointerGatewayMock).inSingletonScope();
  container.bind(TYPES.SourceRepository).to(SourceGatewayMock).inSingletonScope();

  container.bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor);
  container.bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor);
  container.bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  container.bind(TYPES.ProcessDiagnosisUseCase).to(ProcessDiagnosisInteractor);
  container.bind(Translator).to(Translator);

  container.bind(TYPES.Config).to(ConfigImpl).inSingletonScope();

  container.bind(DiagnosisController).toSelf();
  container.bind(DiagnosisPresenter).toSelf();
  container.bind(ReportPresenter).toSelf();
  container.bind(PointerPresenter).toSelf();
  container.bind(RulePresenter).toSelf();

  return container;
};
