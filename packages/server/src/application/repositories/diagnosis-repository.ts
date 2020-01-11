import { Diagnosis } from '../../enterprise/entities/diagnosis';

export type CreateParam = Pick<Diagnosis, 'reports'>;
export type UpdateParam = Diagnosis;

export interface DiagnosisRepository {
  find(id: readonly string[]): Promise<Diagnosis[]>;
  create(diagnosis: CreateParam): Promise<Diagnosis>;
  update(diagnosis: UpdateParam): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
}
