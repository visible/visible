import { PubSub } from 'apollo-server-express';
import DataLoader from 'dataloader';
import { Connection } from 'typeorm';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { DiagnosisAPI } from '../adapters/serializers/diagnosis-serializer';
import { ReportsController } from '../adapters/controllers/reports-controller';

import { DiagnosisRepositoryImpl } from './database/repositories/diagnosis-repository-impl';
import { ReportsRepositoryImpl } from './database/repositories/reports-repository-impl';
import { DiagnosisORM } from './database/entities/diagnosis';
import { ReportORM } from './database/entities/report';

export interface Context {
  pubsub: PubSub;
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
  const pubsub = new PubSub();

  const diagnosisRepository = new DiagnosisRepositoryImpl(connection.getRepository(DiagnosisORM));
  const reportsRepository = new ReportsRepositoryImpl(connection.getRepository(ReportORM));

  const diagnosisController = new DiagnosisController(diagnosisRepository);
  const reportsController = new ReportsController(reportsRepository);

  return (): Context => ({
    pubsub,
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
