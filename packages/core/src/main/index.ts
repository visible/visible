import { BrowserBlinkImpl } from './browser-blink-impl';
import { Visible, VisibleParams } from './visible';

export const visible = (params: VisibleParams) => {
  const puppeteer = new BrowserBlinkImpl();
  return new Visible(params, puppeteer).diagnose();
};

export * from '../shared';
