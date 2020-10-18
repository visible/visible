export interface PublishDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
}

export interface ProcessDiagnosisQueue {
  add(id: string, data: null): Promise<unknown>;
  getCompletedCount(): Promise<number>;
  getWaitingCount(): Promise<number>;
}

export interface ProcessDiagnosisQueueEvents {
  on(event: 'completed', callback: () => void): void;
}
