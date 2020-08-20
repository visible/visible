import { ContainerModule } from 'inversify';

import { DiagnosisController, RuleController } from '../interfaces/controllers';
import { DiagnosisGateway, RuleGateway } from '../interfaces/gateways';
import {
  DiagnosisPresenter,
  LocationPresenter,
  ReportPresenter,
  RulePresenter,
  SourcePresenter,
} from '../interfaces/presenters';
import { TYPES } from '../types';

export const interfaces = new ContainerModule((bind) => {
  // Repository
  bind(TYPES.RuleRepository).to(RuleGateway);
  bind(TYPES.DiagnosisRepository).to(DiagnosisGateway).inSingletonScope();

  // Controller
  bind(DiagnosisController).toSelf();
  bind(RuleController).toSelf();

  // Presenter
  bind(DiagnosisPresenter).toSelf();
  bind(LocationPresenter).toSelf();
  bind(ReportPresenter).toSelf();
  bind(RulePresenter).toSelf();
  bind(SourcePresenter).toSelf();
});
