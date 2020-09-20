import { ContainerModule } from 'inversify';

import {
  CreateDiagnosisInteractor,
  CreateRulesInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  FindRuleByReportIdInteractor,
  ProcessDiagnosisInteractor,
  SubscribeDiagnosisInteractor,
} from '../../application/interactors';
import { TYPES } from '../../types';

export const application = new ContainerModule((bind) => {
  bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor);
  bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor);
  bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  bind(TYPES.SubscribeDiagnosisUseCase).to(SubscribeDiagnosisInteractor);
  bind(TYPES.ProcessDiagnosisUseCase).to(ProcessDiagnosisInteractor);
  bind(TYPES.CreateRuleUseCase).to(CreateRulesInteractor);
  bind(TYPES.FindRuleByReportIdUseCase).to(FindRuleByReportIdInteractor);
});
