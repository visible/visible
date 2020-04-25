import { Diagnosis } from '../../domain/models/diagnosis';

export type CreateParam = Pick<Diagnosis, 'reports'>;

export interface DiagnosisRepository {
  find(id: readonly string[]): Promise<Diagnosis[]>;
  create(diagnosis: CreateParam): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
}
