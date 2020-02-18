import { injectable, unmanaged } from 'inversify';

import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { Report } from '../../../enterprise/entities';

@injectable()
export class ReportsRepositoryInMemoryImpl implements ReportsRepository {
  constructor(
    @unmanaged()
    private reports = new Map<string, Report>(),
  ) {}

  async findByDiagnosisId(id: string) {
    return Array.from(this.reports.values()).filter(
      report => report.diagnosisId === id,
    );
  }
}
