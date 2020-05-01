import { injectable, unmanaged } from 'inversify';

import { ReportsRepository } from '../../application/repositories';
import { Report } from '../../domain/models';

@injectable()
export class ReportsRepositoryInMemoryImpl implements ReportsRepository {
  constructor(
    @unmanaged()
    private reports = new Map<string, Report>(),
  ) {}

  async save(report: Report) {
    this.reports.set(report.id, report);
    return report;
  }

  async findByDiagnosisId(id: string) {
    return [...this.reports.entries()]
      .map(([, value]) => value)
      .filter((report) => report.diagnosisId === id);
  }
}
