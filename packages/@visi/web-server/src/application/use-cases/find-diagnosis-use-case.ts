import { Diagnosis } from '../../domain/models';

export interface FindDiagnosisRequest {
  readonly ids: readonly string[];
}

export interface FindDiagnosisResponse {
  readonly diagnoses: readonly Diagnosis[];
}

export interface FindDiagnosisUseCase {
  run(input: FindDiagnosisRequest): Promise<FindDiagnosisResponse>;
}
