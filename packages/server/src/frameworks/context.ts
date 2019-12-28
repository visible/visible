import DataLoader from 'dataloader';
import { PartialDeep } from 'type-fest';
import { Connection } from 'typeorm';

import { DiagnosisAPI } from '../enterprise/entities/diagnosis';

import { DiagnosisRepository } from '../application/repositories/diagnosis-repository';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';

import { Diagnosis } from './database/entities/diagnosis';
import { DiagnosisRepositoryImpl } from './database/repositories/diagnosis-repository-impl';

export interface Context {
  repositories: {
    diagnosis: DiagnosisRepository;
  };
  loaders: {
    diagnosis: DataLoader<string, PartialDeep<DiagnosisAPI>>;
  };
}

export const createContext = (conncetion: Connection): Context => {
  const diagnosisRepository = new DiagnosisRepositoryImpl(
    conncetion.getRepository(Diagnosis),
  );

  return {
    repositories: {
      diagnosis: diagnosisRepository,
    },
    loaders: {
      diagnosis: new DataLoader((ids: readonly string[]) =>
        new DiagnosisController(diagnosisRepository).find(ids),
      ),
    },
  };
};
