import { PluginResolver, Visible } from '@visi/core';
import pluginGCPTranslationAPI from '@visi/plugin-gcp-translation-api';
import pluginGCPVisionAPI from '@visi/plugin-gcp-vision-api';
import pluginPuppeteer from '@visi/plugin-puppeteer';
import pluginWCAG from '@visi/plugin-wcag';
import mkdirp from 'mkdirp';

export const factory = async (): Promise<Visible> => {
  const resolver = new PluginResolver(
    new Map([
      ['@visi/plugin-puppeteer', pluginPuppeteer],
      ['@visi/plugin-wcag', pluginWCAG],
      ['@visi/plugin-gcp-vision-api', pluginGCPVisionAPI],
      ['@visi/plugin-gcp-translation-api', pluginGCPTranslationAPI],
    ]),
    {
      screenshot: 'only-fail',
      delay: 1000,
      headless: true,
      maxReportsCountPerRule: 5,
    },
  );

  const driver = await resolver
    .getDriverFactory('@visi/plugin-puppeteer')
    .create();

  await mkdirp(resolver.settings.screenshotDir);

  return new Visible(
    resolver.settings,
    driver,
    resolver.getRules(['@visi/plugin-wcag']),
    resolver.getProvider([
      '@visi/plugin-gcp-vision-api',
      '@visi/plugin-gcp-translation-api',
    ]),
  );
};
