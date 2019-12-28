import { Diagnosis } from '../../enterprise/entities';

export interface DiagnosisInput<T = unknown> {
  transform(data: T): Diagnosis;
}
