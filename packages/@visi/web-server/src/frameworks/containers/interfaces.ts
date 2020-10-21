import { ContainerModule } from 'inversify';

import {
  DiagnosisController,
  RuleController,
  StatsController,
} from '../../interfaces/controllers';
import {
  DiagnosisGateway,
  RuleGateway,
  StatsGateway,
} from '../../interfaces/gateways';
import {
  DiagnosisPresenter,
  LocationPresenter,
  ReportPresenter,
  RulePresenter,
  SourcePresenter,
  StatsPresenter,
} from '../../interfaces/presenters';
import { TYPES } from '../../types';

export const interfaces = new ContainerModule((bind) => {
  // Repository
  bind(TYPES.RuleRepository).to(RuleGateway);
  bind(TYPES.DiagnosisRepository).to(DiagnosisGateway).inSingletonScope();
  bind(TYPES.StatsRepository).to(StatsGateway).inSingletonScope();

  // Controller
  bind(DiagnosisController).toSelf();
  bind(RuleController).toSelf();
  bind(StatsController).toSelf();

  // Presenter
  bind(DiagnosisPresenter).toSelf();
  bind(LocationPresenter).toSelf();
  bind(ReportPresenter).toSelf();
  bind(RulePresenter).toSelf();
  bind(SourcePresenter).toSelf();
  bind(StatsPresenter).toSelf();
});
