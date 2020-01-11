import { Container } from 'inversify';
import { FindReportsByDiagnosisId } from '../find-reports-by-diagnosis-id';
import { ReportsRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/reports-repository-in-memory-impl';
import { Report, ReportLevel } from '../../../enterprise/entities';
import { TYPES } from '../../../types';
import { ReportsRepository } from '../../repositories/reports-repository';

describe('FindReportsByDiagnosisId', () => {
  let findReportsByDiagnosisId: FindReportsByDiagnosisId;

  beforeAll(() => {
    const container = new Container();
    const seed = new Map<string, Report>([
      ['123', new Report('123', 'img-alt', '345', ReportLevel.PASSED)],
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
