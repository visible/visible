import { DriverMock, open } from '../driver/driver-mock';
import { ProviderMock } from '../provider/provider-mock';
import { createSettings } from '../settings';
import { Validator } from './validator';

describe('validator', () => {
  it('runs validations', async () => {
    const validator = new Validator(
      createSettings(),
      new DriverMock(),
      [],
      new ProviderMock(),
    );

    const URL = 'https://example.com';
    await validator.diagnose(URL);

    expect(open).toBeCalledWith(URL);
  });

  it('captures', async () => {
    const validator = new Validator(
      createSettings(),
      new DriverMock(),
      [],
      new ProviderMock(),
    );

    const URL = 'https://example.com';
    await validator.capture(URL);

    expect(open).toBeCalledWith(URL);
  });
});
