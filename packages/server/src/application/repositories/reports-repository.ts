import { Report } from '../../enterprise/entities';

export interface ReportsRepository {
  findByDiagnosisId(id: string): Promise<Report[]>;
}
