import { ReportSerializer, ReportLevelAPI } from '../report-serializer';
import { Report, ReportLevel } from '../../../enterprise/entities';

describe('ReportSerializer', () => {
  let reportSerializer: ReportSerializer;

  beforeAll(() => {
    reportSerializer = new ReportSerializer();
  });

  it('serializes properly', () => {
    const report = new Report('123', 'image-alt', '456', ReportLevel.OK);
    const serialized = reportSerializer.serializeOne(report);

    expect(serialized).toEqual({
      id: '123',
      name: 'image-alt',
      level: ReportLevelAPI.OK,
    });
  });
});
