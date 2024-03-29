import { DriverMock } from '../driver/driver-mock';
import { goto } from '../driver/session-mock';
import { ProviderMock } from '../provider/provider-mock';
import { Rule, RuleType } from '../rule';
import { createSettings } from '../settings';
import { Validator } from './validator';

const rule: Rule = {
  id: 'fake-rule',
  name: 'Fake Rule',
  description: 'fake rule',
  type: RuleType.ATOMIC,
  create: jest.fn(),
};

describe('validator', () => {
  it('runs validations', async () => {
    const validator = new Validator(
      createSettings(),
      new DriverMock(),
      [rule],
      new ProviderMock(),
    );

    const URL = 'https://example.com';
    await validator.diagnose({ url: URL }).toPromise();

    expect(goto).toBeCalledWith(URL);
    expect(rule.create).toBeCalled();
  });
});
