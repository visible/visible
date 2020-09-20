import { Plugin } from '@visi/core';

export const loadPlugins = async (
  names: string[],
): Promise<Map<string, Plugin>> => {
  const entries = new Map<string, Plugin>();

  for (const name of names) {
    const module = await import(name);
    const plugin = module.default ?? module;
    entries.set(name, plugin);
  }

  return entries;
};
