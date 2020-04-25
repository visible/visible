import { Diagnosis } from '../../domain/models/diagnosis';

export interface DiagnosisRepository {
  find(id: readonly string[]): Promise<Diagnosis[]>;
  update(diagnosis: Diagnosis): Promise<Diagnosis>;
  create(diagnosis: Diagnosis): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
  queue(diagnosis: Diagnosis): Promise<void>;
}
