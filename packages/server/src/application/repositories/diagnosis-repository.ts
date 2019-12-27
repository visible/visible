import { Diagnosis } from '../../enterprise/entities/diagnosis';

export interface DiagnosisRepository {
  find(id: readonly string[]): Promise<Diagnosis[]>;
  create(diagnosis: Diagnosis): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
}
