export interface ProcessDiagnosisRequest {
  readonly id: string;
}

export type ProcessDiagnosisResponse = void;

export interface ProcessDiagnosisUseCase {
  run(input: ProcessDiagnosisRequest): Promise<ProcessDiagnosisResponse>;
}
