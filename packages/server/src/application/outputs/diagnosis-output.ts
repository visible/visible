import { Diagnosis } from '../../enterprise/entities';

export interface DiagnosisOutput<T = unknown> {
  transformOne(data: Diagnosis): T;
  transform(data: Diagnosis[]): T[];
}
