import { Diagnosis } from '../../enterprise/entities/diagnosis';

export interface DiagnosisRepository {
  get(id: string): Promise<Diagnosis>;
  getAll(id: readonly string[]): Promise<Diagnosis[]>;
  create(diagnosis: Diagnosis): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
}
