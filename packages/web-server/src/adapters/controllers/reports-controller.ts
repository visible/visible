import { inject, injectable } from 'inversify';

import { FindReportsByDiagnosisIdUseCase } from '../../application/use-cases/find-reports-by-diagnosis-id-use-case';
import { TYPES } from '../../types';
import { transformReport } from '../serializers/serializers';

@injectable()
export class ReportsController {
  @inject(TYPES.FindDiagnosisUseCase)
  private findReportsByDiagnosisId: FindReportsByDiagnosisIdUseCase;

  async findByDiagnosisId(id: string) {
    const { reports } = await this.findReportsByDiagnosisId.run({ id });
    const output = reports.map(report => transformReport(report));
    return output;
  }
}
