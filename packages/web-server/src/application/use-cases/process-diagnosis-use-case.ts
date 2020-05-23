import { Diagnosis } from '../../domain/models';

export interface ProcessDiagnosisRequest {
  readonly diagnosis: Diagnosis;
}

export type ProcessDiagnosisResponse = void;

export interface ProcessDiagnosisUseCase {
  run(input: ProcessDiagnosisRequest): Promise<ProcessDiagnosisResponse>;
}
