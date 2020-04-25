import { Container } from 'inversify';

import { Report, ReportType } from '../../../domain/models';
import { ReportsRepositoryInMemoryImpl } from '../../../frameworks/repositories/reports-repository-in-memory-impl';
import { TYPES } from '../../../types';
import { ReportsRepository } from '../../repositories/reports-repository';
import { FindReportsByDiagnosisId } from '../find-reports-by-diagnosis-id';

describe('FindReportsByDiagnosisId', () => {
  let findReportsByDiagnosisId: FindReportsByDiagnosisId;

  beforeAll(() => {
    const container = new Container();
    const seed = new Map<string, Report>([
      ['123', new Report('123', 'img-alt', '345', ReportType.OK)],
    ]);

    container
      .bind<ReportsRepository>(TYPES.ReportsRepository)
      .toConstantValue(new ReportsRepositoryInMemoryImpl(seed));

    container.bind(FindReportsByDiagnosisId).toSelf();
    findReportsByDiagnosisId = container.get(FindReportsByDiagnosisId);
  });

  it('works properly', async () => {
    const result = await findReportsByDiagnosisId.run('345');
    expect(result[0].id).toBe('123');
  });
});
