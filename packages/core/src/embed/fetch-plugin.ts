import { PluginBrowser } from '../shared';

export const fetchPlugin = (
  name: string,
  moduleResolverHost = 'http://localhost:8080',
): Promise<PluginBrowser> => {
  const url = new URL(moduleResolverHost);
  url.pathname = name;
  return import(url.href);
};
