import { Driver, DriverFactory, Session } from '@visi/core';

import { SessionJsdomImpl } from './session-impl';

export class DriverJsdomImpl implements Driver {
  async open(): Promise<Session> {
    return new SessionJsdomImpl();
  }

  async quit(): Promise<void> {
    return;
  }
}

export class DriverFactoryImpl implements DriverFactory {
  async create(): Promise<Driver> {
    return new DriverJsdomImpl();
  }
}
