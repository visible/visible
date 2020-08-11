import { Driver } from './driver';
import { Session } from './session';
import { SessionMock } from './session-mock';

const quit = jest.fn();

export class DriverMock implements Driver {
  quit: () => Promise<void> = quit;

  async open(): Promise<Session> {
    return new SessionMock();
  }
}
