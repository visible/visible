import { Report } from '../../domain/models';

export interface ReportsRepository {
  findByDiagnosisId(id: string): Promise<Report[]>;
}
