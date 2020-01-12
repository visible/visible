import { Diagnosis } from '../../enterprise/entities';

export interface DiagnosisWorker {
  append(diagnosis: Diagnosis): Promise<void>;
}
