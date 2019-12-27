import DataLoader from 'dataloader';
import { PartialDeep } from 'type-fest';
import { Connection } from 'typeorm';

import { DiagnosisAPI } from '../enterprise/entities/diagnosis';

import { DiagnosisRepository } from '../application/repositories/diagnosis-repository';

import { DiagnosisController } from '../adapters/controllers/diagnosis-controller';
import { DiagnosticsRepositoryImpl } from '../adapters/storage/diagnostics-repository-impl';

import { Diagnosis } from './database/entities/diagnosis';

export interface Context {
  repositories: {
    diagnosis: DiagnosisRepository;
  };
  loaders: {
    diagnosis: DataLoader<string, PartialDeep<DiagnosisAPI>>;
  };
}

export const createContext = (conncetion: Connection): Context => {
  const diagnosisRepository = new DiagnosticsRepositoryImpl(
    conncetion.getRepository(Diagnosis),
  );

  return {
    repositories: {
      diagnosis: diagnosisRepository,
    },
    loaders: {
      diagnosis: new DataLoader((ids: readonly string[]) =>
        new DiagnosisController(diagnosisRepository).getAll(ids),
      ),
    },
  };
};
