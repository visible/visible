import { Observable } from 'rxjs';

import { Diagnosis } from '../../domain/models/diagnosis';

export interface SubscribeDiagnosisRequest {
  readonly id: string;
}

export type SubscribeDiagnosisResponse = Observable<Diagnosis>;

export interface SubscribeDiagnosisUseCase {
  run(input: SubscribeDiagnosisRequest): SubscribeDiagnosisResponse;
}
