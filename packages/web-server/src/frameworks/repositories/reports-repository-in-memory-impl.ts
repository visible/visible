import { injectable, unmanaged } from 'inversify';

import { ReportsRepository } from '../../application/repositories/reports-repository';
import { Report } from '../../domain/models';

@injectable()
export class ReportsRepositoryInMemoryImpl implements ReportsRepository {
  constructor(
    @unmanaged()
    private reports = new Map<string, Report>(),
  ) {}

  async findByDiagnosisId(_id: string) {
    // ReportにDiagnosis持たせる？
    return this.reports.entries().next().value;
  }
}
