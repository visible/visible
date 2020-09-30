import {
  Plugin,
  PluginResolver,
  RuleConstructor,
  Source,
  Visible,
} from '@visi/core';
import pluginJSDOM from '@visi/plugin-jsdom';

import { echoProvider } from './mock-provider';

export const findSource = (
  url: string,
  sources: Source[],
): Source | undefined => {
  return sources.find((source) => source.url === url);
};

export const run = async (
  Rule: RuleConstructor,
  html: string,
): Promise<Source[]> => {
  const rule = new Rule();

  const pluginResolver = new PluginResolver(
    new Map([
      ['@visi/plugin-jsdom', pluginJSDOM],
      ['@visi/jest/echo-provider', { provider: echoProvider } as Plugin],
    ]),
    {},
  );

  const driver = await pluginResolver
    .getDriverFactory('@visi/plugin-jsdom')
    .create();
  const provider = pluginResolver.getProvider(['@visi/jest/echo-provider']);
  const validator = new Visible(
    pluginResolver.settings,
    driver,
    [rule],
    provider,
  );

  return validator
    .diagnose({ html })
    .toPromise()
    .then((progress) => [...progress.sources.values()]);
};
