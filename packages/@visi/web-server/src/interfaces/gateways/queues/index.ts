export interface PublishDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
}

export interface ProcessDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
}
