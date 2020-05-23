import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository } from '../repositories';
import {
  SubscribeDiagnosisRequest,
  SubscribeDiagnosisResponse,
  SubscribeDiagnosisUseCase,
} from '../use-cases';

@injectable()
export class SubscribeDiagnosisInteractor implements SubscribeDiagnosisUseCase {
  constructor(
    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  run({ id }: SubscribeDiagnosisRequest): SubscribeDiagnosisResponse {
    const diagnosis$ = this.diagnosisRepository.subscribe(id);
    return diagnosis$;
  }
}
