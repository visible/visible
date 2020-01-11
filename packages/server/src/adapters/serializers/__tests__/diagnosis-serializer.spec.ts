import {
  DiagnosisSerializer,
  DiagnosisStatusAPI,
} from '../diagnosis-serializer';
import { Diagnosis, DiagnosisStatus } from '../../../enterprise/entities';

describe('DiagnosisSerializer', () => {
  let diagnosisSerializer: DiagnosisSerializer;

  beforeAll(() => {
    diagnosisSerializer = new DiagnosisSerializer();
  });

  it('serializes properly', () => {
    const diagnosis = new Diagnosis(
      '123',
      DiagnosisStatus.DONE,
      [],
      0,
      2,
      new Date(),
      new Date(),
    );

    const result = diagnosisSerializer.transformOne(diagnosis);

    expect(result).toEqual({
      id: '123',
      screenshot: '',
      score: diagnosis.getScore(),
      status: DiagnosisStatusAPI.DONE,
      totalRulesCount: 2,
      doneRulesCount: 0,
      reports: [],
    });
  });
});
