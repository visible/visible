import { injectable, inject } from 'inversify';
import { ReportSerializer } from '../serializers/report-serializer';
import { FindReportsByDiagnosisId } from '../../application/use-cases/find-reports-by-diagnosis-id';

@injectable()
export class ReportsController {
  @inject(FindReportsByDiagnosisId)
  private findReportsByDiagnosisId: FindReportsByDiagnosisId;

  async findByDiagnosisId(id: string) {
    const result = await this.findReportsByDiagnosisId.run(id);
    const output = new ReportSerializer().serialize(result);
    return output;
  }
}
