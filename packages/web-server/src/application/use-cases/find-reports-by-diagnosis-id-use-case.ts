import { inject, injectable } from 'inversify';

import { Report } from '../../domain/models';
import { TYPES } from '../../types';
import { ReportsRepository } from '../repositories/reports-repository';

@injectable()
export class FindReportsByDiagnosisIdInteractor {
  @inject(TYPES.ReportsRepository)
  private reportsRepository: ReportsRepository;

  run(id: string) {
    return this.reportsRepository.findByDiagnosisId(id);
  }
}

export interface FindReportsByDiagnosisIdRequest {
  readonly id: string;
}

export interface FindReportsByDiagnosisIdResponse {
  readonly reports: readonly Report[];
}

export interface FindReportsByDiagnosisIdUseCase {
  run(
    input: FindReportsByDiagnosisIdRequest,
  ): Promise<FindReportsByDiagnosisIdResponse>;
}
