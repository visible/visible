import { Report, ReportType } from '../../../enterprise/entities';
import { ReportSerializer, ReportTypeAPI } from '../report-serializer';

describe('ReportSerializer', () => {
  let reportSerializer: ReportSerializer;

  beforeAll(() => {
    reportSerializer = new ReportSerializer();
  });

  it('serializes properly', () => {
    const report = new Report('123', 'image-alt', '456', ReportType.OK);
    const serialized = reportSerializer.serializeOne(report);

    expect(serialized).toEqual({
      id: '123',
      name: 'image-alt',
      type: ReportTypeAPI.OK,
    });
  });
});
