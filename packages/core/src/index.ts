import { BrowserPuppeteerImpl } from './adapters/puppeteer-impl';
import { Visible, VisibleParams } from './adapters/visible';

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserPuppeteerImpl();
  return new Visible(params, puppeteer).diagnose();
};

export * from './domain/browser';
export * from './domain/config';
export * from './domain/context';
export * from './domain/fixers';
export * from './domain/plugin';
export * from './domain/report';
export * from './domain/rule';
