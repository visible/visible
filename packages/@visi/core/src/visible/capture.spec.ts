import { DriverMock } from '../driver/driver-mock';
import { goto } from '../driver/session-mock';
import { createSettings } from '../settings';
import { Capturer } from './capturer';

it('captures', async () => {
  const capturer = new Capturer(createSettings(), new DriverMock());

  const URL = 'https://example.com';
  await capturer.capture(URL);

  expect(goto).toBeCalledWith(URL);
});
