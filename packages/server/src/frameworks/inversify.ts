import { Repository, Connection } from 'typeorm';
import { Container } from 'inversify';
import { TYPES } from '../types';
import { DiagnosticsRepositoryImpl } from '../adapters/storage/diagnostics-repository-impl';
import { DiagnosisRepository } from '../application/repositories/diagnosis-repository';
import { Diagnosis } from './database/entities/diagnosis';

export const injectDependencies = (connection: Connection) => {
  const container = new Container();

  container
    .bind<Repository<Diagnosis>>(TYPES.DiagnosisDataMapper)
    .toConstantValue(connection.getRepository(Diagnosis));

  container
    .bind<DiagnosisRepository>(TYPES.DiagnosisRepository)
    .to(DiagnosticsRepositoryImpl);
};
