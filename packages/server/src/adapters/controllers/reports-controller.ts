import { ReportsRepository } from '../../application/repositories/reports-repository';
import { ReportSerializer } from '../serializers/report-serializer';

export class ReportsController {
  constructor(private reportsRepository: ReportsRepository) {}

  async findByDiagnosisId(id: string) {
    const result = await this.reportsRepository.findByDiagnosisId(id);
    const output = new ReportSerializer().serialize(result);
    return output;
  }
}
