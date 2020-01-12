import { PubSub } from 'apollo-server-express';
import { injectable, inject } from 'inversify';
import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { ReportsController } from '../adapters/controllers/reports-controller';
import { TYPES } from '../types';
import { DiagnosisLoader } from './database/loaders/diagnosis-loader';

@injectable()
export class Context {
  @inject(TYPES.PubSub)
  pubSub: PubSub;

  @inject(DiagnosisController)
  diagnosisController: DiagnosisController;

  @inject(ReportsController)
  reportsController: ReportsController;

  @inject(TYPES.DiagnosisLoader)
  diagnosisLoader: DiagnosisLoader;
}
