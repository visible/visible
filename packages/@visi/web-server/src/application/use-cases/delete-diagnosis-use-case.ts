export interface DeleteDiagnosisRequest {
  readonly id: string;
}

export interface DeleteDiagnosisResponse {
  readonly id: string;
}

export interface DeleteDiagnosisUseCase {
  run(input: DeleteDiagnosisRequest): Promise<DeleteDiagnosisResponse>;
}
