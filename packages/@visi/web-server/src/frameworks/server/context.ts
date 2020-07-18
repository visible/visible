import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';

import { DiagnosisController } from '../../interfaces/controllers';
import { DiagnosisAPI } from '../../interfaces/presenters';

export interface Context {
  diagnosisLoader: DataLoader<string, DiagnosisAPI>;
  diagnosisController: DiagnosisController;
}

@injectable()
export class ContextImpl implements Context {
  constructor(
    @inject(DiagnosisController)
    readonly diagnosisController: DiagnosisController,
  ) {}

  readonly diagnosisLoader = new DataLoader<string, DiagnosisAPI>((keys) => {
    return this.diagnosisController.find(keys);
  });
}
