import { BrowserPuppeteerImpl } from './browser-puppeteer-impl';
import { Visible, VisibleParams } from './visible';

export const visible = async (params: VisibleParams) => {
  const browser = new BrowserPuppeteerImpl();
  return await Visible.init(params, browser);
};

export * from '../shared';
