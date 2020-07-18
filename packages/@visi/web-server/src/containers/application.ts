import { ContainerModule } from 'inversify';

import {
  CreateDiagnosisInteractor,
  DeleteDiagnosisInteractor,
  FindDiagnosisInteractor,
  ProcessDiagnosisInteractor,
  SubscribeDiagnosisInteractor,
} from '../application/interactors';
import { Translator } from '../application/translator';
import { TYPES } from '../types';

export const application = new ContainerModule((bind) => {
  bind(TYPES.FindDiagnosisUseCase).to(FindDiagnosisInteractor);
  bind(TYPES.CreateDiagnosisUseCase).to(CreateDiagnosisInteractor);
  bind(TYPES.DeleteDiagnosisUseCase).to(DeleteDiagnosisInteractor);
  bind(TYPES.SubscribeDiagnosisUseCase).to(SubscribeDiagnosisInteractor);
  bind(TYPES.ProcessDiagnosisUseCase).to(ProcessDiagnosisInteractor);
  bind(Translator).toSelf();
});
