import { PluginBrowser } from '../shared';

export const fetchPlugin = (
  name: string,
  moduleResolverHost = 'https://localhost',
): Promise<PluginBrowser> => {
  const url = new URL(moduleResolverHost);
  url.pathname = name;
  return import(url.href).then(plugin => plugin.default);
};
