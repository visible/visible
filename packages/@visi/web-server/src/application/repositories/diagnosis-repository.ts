import { Observable } from 'rxjs';

import { Diagnosis, Report } from '../../domain/models/diagnosis';

export interface DiagnosisRepository {
  find(id: readonly string[]): Promise<Diagnosis[]>;
  save(diagnosis: Diagnosis): Promise<Diagnosis>;
  delete(id: string): Promise<string>;
  queue(diagnosis: Diagnosis): Promise<void>;
  publish(diagnosis: Diagnosis): Promise<void>;
  subscribe(id: string): Observable<Diagnosis>;
  findReport(id: string): Promise<Report | undefined>;
}
