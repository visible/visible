import DataLoader from 'dataloader';
import { Connection } from 'typeorm';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { DiagnosisAPI } from '../adapters/serializers/diagnosis-serializer';
import { ReportsController } from '../adapters/controllers/reports-controller';

import { Diagnosis } from './database/entities/diagnosis';
import { DiagnosisRepositoryImpl } from './database/repositories/diagnosis-repository-impl';
import { ReportsRepositoryImpl } from './database/repositories/reports-repository-impl';
import { Report } from './database/entities/report';

export interface Context {
  controllers: {
    diagnosis: DiagnosisController;
    reports: ReportsController;
  };
  loaders: {
    diagnosis: DataLoader<string, DiagnosisAPI>;
  };
}

// prettier-ignore
export const makeCreateContext = (connection: Connection) => {
  const diagnosisRepository = new DiagnosisRepositoryImpl(connection.getRepository(Diagnosis));
  const reportsRepository = new ReportsRepositoryImpl(connection.getRepository(Report));

  const diagnosisController = new DiagnosisController(diagnosisRepository);
  const reportsController = new ReportsController(reportsRepository);

  return (): Context => ({
    controllers: {
      diagnosis: diagnosisController,
      reports: reportsController,
    },
    loaders: {
      diagnosis: new DataLoader((ids: readonly string[]) =>
        diagnosisController.find(ids),
      ),
    },
  });
};
