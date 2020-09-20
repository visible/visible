import DataLoader from 'dataloader';
import { inject, injectable } from 'inversify';

import {
  DiagnosisController,
  RuleController,
} from '../../interfaces/controllers';
import { API } from '../../interfaces/presenters';

export interface Context {
  diagnosisLoader: DataLoader<string, API.Diagnosis>;
  diagnosisController: DiagnosisController;
  ruleController: RuleController;
}

@injectable()
export class ContextImpl implements Context {
  readonly diagnosisLoader = new DataLoader<string, API.Diagnosis>((keys) => {
    return this.diagnosisController.find(keys);
  });

  constructor(
    @inject(DiagnosisController)
    readonly diagnosisController: DiagnosisController,

    @inject(RuleController)
    readonly ruleController: RuleController,
  ) {}
}
