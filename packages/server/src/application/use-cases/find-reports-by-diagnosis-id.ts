import { inject, injectable } from 'inversify';
import { ReportsRepository } from '../repositories/reports-repository';
import { TYPES } from '../../types';

@injectable()
export class FindReportsByDiagnosisId {
  @inject(TYPES.ReportsRepository)
  private readonly reportsRepository: ReportsRepository;

  run(id: string) {
    return this.reportsRepository.findByDiagnosisId(id);
  }
}
