import { Diagnosis } from '../../../domain/models';
import { DiagnosisPresenter } from '../diagnosis-presenter';

describe('DiagnosisPresenter', () => {
  let diagnosisPresenter: DiagnosisPresenter;

  beforeAll(() => {
    diagnosisPresenter = new DiagnosisPresenter();
  });

  it('serializes properly', () => {
    const diagnosis = new Diagnosis('123', [], new Date(), new Date());
    const result = diagnosisPresenter.transformOne(diagnosis);

    expect(result).toEqual({
      id: '123',
      screenshot: '',
      score: diagnosis.getScore(),
      reports: [],
    });
  });
});
