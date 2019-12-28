import { ReportsRepository } from '../repositories/reports-repository';

export class FindReportsByDiagnosisId {
  constructor(private reportsRepostiroy: ReportsRepository) {}

  run(id: string) {
    return this.reportsRepostiroy.findByDiagnosisId(id);
  }
}
