import DataLoader from 'dataloader';
import { Connection } from 'typeorm';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { DiagnosisAPI } from '../adapters/serializers/diagnosis-serializer';

import { Diagnosis } from './database/entities/diagnosis';
import { DiagnosisRepositoryImpl } from './database/repositories/diagnosis-repository-impl';

export interface Context {
  controllers: {
    diagnosis: DiagnosisController;
  };
  loaders: {
    diagnosis: DataLoader<string, DiagnosisAPI>;
  };
}

export const createContext = (conncetion: Connection): Context => {
  const diagnosisRepository = new DiagnosisRepositoryImpl(
    conncetion.getRepository(Diagnosis),
  );

  const diagnosisController = new DiagnosisController(diagnosisRepository);

  return {
    controllers: {
      diagnosis: diagnosisController,
    },
    loaders: {
      diagnosis: new DataLoader((ids: readonly string[]) =>
        diagnosisController.find(ids),
      ),
    },
  };
};
