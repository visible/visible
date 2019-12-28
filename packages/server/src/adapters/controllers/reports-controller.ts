import { injectable, inject } from 'inversify';
import { ReportsRepository } from '../../application/repositories/reports-repository';
import { ReportSerializer } from '../serializers/report-serializer';
import { TYPES } from '../../types';

@injectable()
export class ReportsController {
  @inject(TYPES.ReportsRepository)
  private reportsRepository: ReportsRepository;

  async findByDiagnosisId(id: string) {
    const result = await this.reportsRepository.findByDiagnosisId(id);
    const output = new ReportSerializer().serialize(result);
    return output;
  }
}
