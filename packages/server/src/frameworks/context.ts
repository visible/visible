import dotenv from 'dotenv';
import DataLoader from 'dataloader';
import { injectable, inject } from 'inversify';
import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { ReportsController } from '../adapters/controllers/reports-controller';
import { TYPES } from '../types';

dotenv.config({ path: '../.env' });

@injectable()
export class Context {
  @inject(TYPES.DiagnosisController)
  diagnosisContorller: DiagnosisController;

  @inject(TYPES.ReportsController)
  reportsController: ReportsController;

  diagnosisLoader = new DataLoader((ids: readonly string[]) =>
    this.diagnosisContorller.find(ids),
  );
}
