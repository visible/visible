import { Report } from '../../domain/models';

export interface ReportRepository {
  save(report: Report): Promise<Report>;
  findByDiagnosisId(id: string): Promise<Report[]>;
}
