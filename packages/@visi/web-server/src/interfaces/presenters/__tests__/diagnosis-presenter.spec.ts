import { diagnosis } from '../../../__fixtures__/diagnosis';
import { createContainer } from '../../../tests/container';
import { DiagnosisPresenter } from '../diagnosis-presenter';

describe('DiagnosisPresenter', () => {
  let diagnosisPresenter: DiagnosisPresenter;

  beforeAll(() => {
    const container = createContainer();
    diagnosisPresenter = container.get(DiagnosisPresenter);
  });

  it('transforms diagnosis into API response', () => {
    const response = diagnosisPresenter.run(diagnosis);
    expect(response).toMatchSnapshot();
  });
});
