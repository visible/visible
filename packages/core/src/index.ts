import { BrowserPuppeteerImpl } from './main/adapters/puppeteer-impl';
import { Visible, VisibleParams } from './main/visible';

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserPuppeteerImpl();
  return new Visible(params, puppeteer).diagnose();
};

export * from './main/domain/browser';
export * from './main/domain/config';
export * from './main/domain/plugin';
export * from './main/domain/report';
export * from './main/domain/rule';

export * from './renderer/base-rule';
export * from './renderer/localize';
