import { OnReady } from '../../shared/gateway';
import { initI18n } from './init-i18n';
import { loadPlugins } from './load-plugin';

export const onReady: OnReady = async () => {
  await Promise.all([
    loadPlugins(),
    initI18n(window.__VISIBLE_CONFIG__.settings?.language),
  ]);
};
