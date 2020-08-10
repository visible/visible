import { Driver } from './driver';
import { SessionMock } from './session-mock';

const quit = jest.fn();

export class DriverMock implements Driver {
  quit = quit;

  async open() {
    return new SessionMock();
  }
}
