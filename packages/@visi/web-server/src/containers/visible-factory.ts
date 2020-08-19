import { PluginResolver, Visible } from '@visi/core';
import pluginGCPVisionAPI from '@visi/plugin-gcp-vision-api';
import pluginPuppeteer from '@visi/plugin-puppeteer';
import pluginStandard from '@visi/plugin-standard';

export const factory = async (): Promise<Visible> => {
  const resolver = new PluginResolver(
    new Map([
      ['@visi/plugin-puppeteer', pluginPuppeteer],
      ['@visi/plugin-standard', pluginStandard],
      ['@visi/plugin-gcp-vision-api', pluginGCPVisionAPI],
    ]),
    {
      screenshot: 'only-fail',
      delay: 1000,
      headless: process.env.NODE_ENV === 'production',
      maxReportsCountPerRule: 5,
    },
  );

  const driver = await resolver
    .getDriverFactory('@visi/plugin-puppeteer')
    .create();

  return new Visible(
    resolver.settings,
    driver,
    resolver.getRules(['@visi/plugin-standard']),
    resolver.getProvider(['@visi/plugin-gcp-vision-api']),
  );
};
