import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { ReportsRepository } from '../repositories/reports-repository';

@injectable()
export class FindReportsByDiagnosisId {
  @inject(TYPES.ReportsRepository)
  private reportsRepository: ReportsRepository;

  run(id: string) {
    return this.reportsRepository.findByDiagnosisId(id);
  }
}
