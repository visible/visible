import { Report } from '../../domain/models';

export interface ReportsRepository {
  save(report: Report): Promise<Report>;
  findByDiagnosisId(id: string): Promise<Report[]>;
}
