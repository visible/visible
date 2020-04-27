import { inject, injectable } from 'inversify';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { ReportsController } from '../adapters/controllers/reports-controller';
import { TYPES } from '../types';
import { DiagnosisLoader } from './loaders/diagnosis-loader';

@injectable()
export class Context {
  @inject(DiagnosisController)
  diagnosisController: DiagnosisController;

  @inject(ReportsController)
  reportsController: ReportsController;

  @inject(TYPES.DiagnosisLoader)
  diagnosisLoader: DiagnosisLoader;
}
