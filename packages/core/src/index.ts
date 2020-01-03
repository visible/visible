import { BrowserPuppeteerImpl } from './main/adapters/puppeteer-impl';
import { Visible, VisibleParams } from './main/adapters/visible';

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserPuppeteerImpl();
  return new Visible(params, puppeteer).diagnose();
};

export * from './main/domain/browser';
export * from './main/domain/config';
export * from './main/domain/context';
export * from './main/domain/fixers';
export * from './main/domain/plugin';
export * from './main/domain/report';
export * from './main/domain/rule';
