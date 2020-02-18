import { Diagnosis } from '../../../enterprise/entities';
import { DiagnosisSerializer } from '../diagnosis-serializer';

describe('DiagnosisSerializer', () => {
  let diagnosisSerializer: DiagnosisSerializer;

  beforeAll(() => {
    diagnosisSerializer = new DiagnosisSerializer();
  });

  it('serializes properly', () => {
    const diagnosis = new Diagnosis('123', [], new Date(), new Date());
    const result = diagnosisSerializer.transformOne(diagnosis);

    expect(result).toEqual({
      id: '123',
      screenshot: '',
      score: diagnosis.getScore(),
      reports: [],
    });
  });
});
