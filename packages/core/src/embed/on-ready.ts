import { loadPlugins } from './load-plugin';

export const onReady = () => Promise.all([loadPlugins()]);
