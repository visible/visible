import { BrowserChromiumImpl } from './browser-chromium-impl';
import { BrowserFirefoxImpl } from './browser-firefox-impl';
import { Visible, VisibleParams } from './visible';
import { ModuleResolverImpl } from './module-resolver';

export const visible = async (params: VisibleParams) => {
  const browserName = params.config.settings?.browser ?? 'chromium';

  // prettier-ignore
  const browser
    = browserName === 'chromium' ? new BrowserChromiumImpl()
    : browserName === 'firefox' ? new BrowserFirefoxImpl()
    : undefined;

  if (!browser) throw new Error();
  const moduleResolver = new ModuleResolverImpl(8080, 'browser');
  return (await Visible.init(params, browser, moduleResolver)).diagnose();
};

export * from '../shared';
