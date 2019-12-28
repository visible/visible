import { ReportsRepository } from '../repositories/reports-repository';

export class FindReportsByDiagnosisId {
  constructor(private reportsRepostiroy: ReportsRepository) {}

  run(id: string) {
    this.reportsRepostiroy.findByDiagnosisId(id);
  }
}
