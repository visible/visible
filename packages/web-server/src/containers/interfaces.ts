import { ContainerModule } from 'inversify';

import { DiagnosisController } from '../interfaces/controllers';
import {
  DiagnosisGateway,
  PointersGateway,
  ReportGateway,
  RuleGateway,
  SourceGateway,
} from '../interfaces/gateways';
import {
  DiagnosisPresenter,
  PointerPresenter,
  ReportPresenter,
  RulePresenter,
} from '../interfaces/presenters';
import { TYPES } from '../types';

export const interfaces = new ContainerModule((bind) => {
  // Repository
  bind(TYPES.ReportRepository).to(ReportGateway);
  bind(TYPES.RuleRepository).to(RuleGateway);
  bind(TYPES.PointerRepository).to(PointersGateway);
  bind(TYPES.SourceRepository).to(SourceGateway);
  // TODO: Use transient
  bind(TYPES.DiagnosisRepository).to(DiagnosisGateway).inSingletonScope();

  // Controller
  bind(DiagnosisController).toSelf();

  // Presenter
  bind(DiagnosisPresenter).toSelf();
  bind(ReportPresenter).toSelf();
  bind(PointerPresenter).toSelf();
  bind(RulePresenter).toSelf();
});
