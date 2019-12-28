import { ReportSerializer, ReportTypeAPI } from '../report-serializer';
import { Report, ReportType } from '../../../enterprise/entities';

describe('ReportSerializer', () => {
  let reportSerializer: ReportSerializer;

  beforeAll(() => {
    reportSerializer = new ReportSerializer();
  });

  it('serializes properly', () => {
    const report = new Report('123', 'image-alt', '456', ReportType.OK);
    const serizalized = reportSerializer.serializeOne(report);

    expect(serizalized).toEqual({
      id: '123',
      name: 'image-alt',
      type: ReportTypeAPI.OK,
    });
  });
});
