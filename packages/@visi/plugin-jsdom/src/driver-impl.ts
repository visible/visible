import { Driver, DriverFactory, Session, Settings } from '@visi/core';

import { SessionJsdomImpl } from './session-impl';

export class DriverJsdomImpl implements Driver {
  constructor(private readonly settings: Settings) {}

  async open(): Promise<Session> {
    return new SessionJsdomImpl(this.settings);
  }

  async quit(): Promise<void> {
    return;
  }
}

export class DriverFactoryImpl implements DriverFactory {
  constructor(private readonly settings: Settings) {}

  async create(): Promise<Driver> {
    return new DriverJsdomImpl(this.settings);
  }
}
