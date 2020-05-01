import { LoadPlugins } from '../../shared/gateway';
import { PluginBrowser } from '../plugin';

export const loadPlugins: LoadPlugins = async (
  moduleResolverHost = 'https://localhost',
) => {
  if (!window.__VISIBLE_PLUGINS__) {
    window.__VISIBLE_PLUGINS__ = [];
  }

  const pluginNames = window.__VISIBLE_CONFIG__.plugins ?? [];

  for (const pluginName of pluginNames) {
    const url = new URL(moduleResolverHost);
    url.pathname = pluginName;

    const plugin: PluginBrowser = await import(url.href).then(
      (plugin) => plugin.default,
    );

    window.__VISIBLE_PLUGINS__.push(plugin);
  }
};
