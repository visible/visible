import { DriverMock, getSources, open, quit } from '../driver/driver-mock';
import { ProviderMock } from '../provider/provider-mock';
import { createSettings } from '../settings';
import { Validator } from './validator';

describe('validator', () => {
  beforeAll(() => {
    getSources.mockImplementation(() => []);
  });

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
    expect(quit).toBeCalled();
  });
});
