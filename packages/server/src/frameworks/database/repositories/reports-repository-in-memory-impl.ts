import { ReportsRepository } from '../../../application/repositories/reports-repository';
import { Report } from '../../../enterprise/entities';

export class ReportsRepositoryInMemoryImpl implements ReportsRepository {
  constructor(private reports = new Map<string, Report>()) {}

  async findByDiagnosisId(id: string) {
    return Array.from(this.reports.values()).filter(
      report => report.diagnosisId === id,
    );
  }
}
