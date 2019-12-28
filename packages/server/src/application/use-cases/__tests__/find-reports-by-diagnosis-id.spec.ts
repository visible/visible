import { FindReportsByDiagnosisId } from '../find-reports-by-diagnosis-id';
import { ReportsRepositoryInMemoryImpl } from '../../../frameworks/database/repositories/reports-repository-in-memory-impl';
import { Report, ReportType } from '../../../enterprise/entities';

describe('FindReportsByDiagnosisId', () => {
  let findReportsByDiagnosisId: FindReportsByDiagnosisId;

  beforeAll(() => {
    const reportsRepository = new ReportsRepositoryInMemoryImpl(
      new Map<string, Report>([
        ['123', new Report('123', 'img-alt', '345', ReportType.OK)],
      ]),
    );
    findReportsByDiagnosisId = new FindReportsByDiagnosisId(reportsRepository);
  });

  it('works properly', async () => {
    const result = await findReportsByDiagnosisId.run('345');
    expect(result[0].id).toBe('123');
  });
});
