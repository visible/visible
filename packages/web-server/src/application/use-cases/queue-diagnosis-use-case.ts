import { Diagnosis } from '../../domain/models';

export interface QueueDiagnosisRequest {
  readonly diagnosis: Diagnosis;
}

export type QueueDiagnosisResponse = void;

export interface QueueDiagnosisUseCase {
  run(input: QueueDiagnosisRequest): Promise<QueueDiagnosisResponse>;
}
