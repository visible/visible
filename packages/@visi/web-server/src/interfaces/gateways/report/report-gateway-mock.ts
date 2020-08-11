import { injectable, unmanaged } from 'inversify';

import { ReportRepository } from '../../../application/repositories';
import { Report } from '../../../domain/models';

@injectable()
export class ReportGatewayMock implements ReportRepository {
  constructor(
    @unmanaged()
    private reports = new Map<string, Report>(),
  ) {}

  async save(report: Report): Promise<Report> {
    this.reports.set(report.id, report);
    return report;
  }

  async findByDiagnosisId(id: string): Promise<Report[]> {
    return [...this.reports.entries()]
      .map(([, value]) => value)
      .filter((report) => report.diagnosisId === id);
  }
}
