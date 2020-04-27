import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { ReportsRepository } from '../repositories/reports-repository';
import {
  FindReportsByDiagnosisIdRequest,
  FindReportsByDiagnosisIdResponse,
  FindReportsByDiagnosisIdUseCase,
} from '../use-cases';

@injectable()
export class FindReportsByDiagnosisIdInteractor
  implements FindReportsByDiagnosisIdUseCase {
  @inject(TYPES.ReportsRepository)
  private readonly reportsRepository: ReportsRepository;

  async run({
    id,
  }: FindReportsByDiagnosisIdRequest): Promise<
    FindReportsByDiagnosisIdResponse
  > {
    const reports = await this.reportsRepository.findByDiagnosisId(id);
    return { reports };
  }
}
