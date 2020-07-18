import { Diagnosis } from '../../domain/models';

export interface CreateDiagnosisRequest {
  readonly url: string;
}

export interface CreateDiagnosisResponse {
  readonly diagnosis: Diagnosis;
}

export interface CreateDiagnosisUseCase {
  run(input: CreateDiagnosisRequest): Promise<CreateDiagnosisResponse>;
}
