import { PluginBrowser } from '../main';

export const loadPlugins = async (moduleResolverHost = 'https://localhost') => {
  const pluginNames = window.__VISIBLE_CONFIG__.plugins ?? [];

  for (const pluginName of pluginNames) {
    const url = new URL(moduleResolverHost);
    url.pathname = pluginName;

    const plugin: PluginBrowser = await import(url.href).then(
      plugin => plugin.default,
    );

    window.__VISIBLE_PLUGINS__.push(plugin);
  }
};
