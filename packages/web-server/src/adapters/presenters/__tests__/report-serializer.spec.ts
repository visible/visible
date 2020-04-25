import { Report, ReportType } from '../../../domain/models';
import { ReportPresenter, ReportTypeAPI } from '../report-presenter';

describe('ReportPresenter', () => {
  let reportPresenter: ReportPresenter;

  beforeAll(() => {
    reportPresenter = new ReportPresenter();
  });

  it('serializes properly', () => {
    const report = new Report('123', 'image-alt', '456', ReportType.OK);
    const serialized = reportPresenter.serializeOne(report);

    expect(serialized).toEqual({
      id: '123',
      name: 'image-alt',
      type: ReportTypeAPI.OK,
    });
  });
});
