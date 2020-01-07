import { BrowserBlinkImpl } from './browser-blink-impl';
import { Visible, VisibleParams } from './visible';
import { ModuleResolverImpl } from './module-resolver';

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserBlinkImpl();
  const moduleResolver = new ModuleResolverImpl(8080, 'browser');

  return new Visible(params, puppeteer, moduleResolver).diagnose();
};

export * from '../shared';
