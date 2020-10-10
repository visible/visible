import { PluginResolver, Settings, Visible } from '@visi/core';
import pluginGCPTranslationAPI from '@visi/plugin-gcp-translation-api';
import pluginGCPVisionAPI from '@visi/plugin-gcp-vision-api';
import pluginPuppeteer from '@visi/plugin-puppeteer';
import pluginWCAG from '@visi/plugin-wcag';
import { createPool, Pool } from 'generic-pool';
import { inject, injectable } from 'inversify';
import mkdirp from 'mkdirp';

import { TYPES } from '../../../types';
import { Config } from '../../config';

export interface VisiblePool {
  acquire(priority?: number): PromiseLike<Visible>;
  release(resource: Visible): PromiseLike<void>;
  drain(): PromiseLike<void>;
  clear(): PromiseLike<void>;
}

@injectable()
export class VisiblePoolImpl implements VisiblePool {
  private readonly pool: Pool<Visible>;

  private readonly plugins = new Map([
    ['@visi/plugin-puppeteer', pluginPuppeteer],
    ['@visi/plugin-wcag', pluginWCAG],
    ['@visi/plugin-gcp-vision-api', pluginGCPVisionAPI],
    ['@visi/plugin-gcp-translation-api', pluginGCPTranslationAPI],
  ]);

  private readonly settings: Partial<Settings> = {
    format: true,
    screenshot: 'only-fail',
    delay: 3000,
    headless: false,
    maxReportsCountPerRule: 10,
  };

  constructor(
    @inject(TYPES.Config)
    private readonly config: Config,
  ) {
    this.pool = createPool(
      {
        create: this.create,
        destroy: this.destroy,
      },
      {
        min: 1,
        max: config.diagnosisConcurrency,
      },
    );
  }

  acquire(priority?: number): PromiseLike<Visible> {
    return this.pool.acquire(priority);
  }

  release(resource: Visible): PromiseLike<void> {
    return this.pool.release(resource);
  }

  drain(): PromiseLike<void> {
    return this.pool.drain();
  }

  clear(): PromiseLike<void> {
    return this.pool.clear();
  }

  private create = async (): Promise<Visible> => {
    const resolver = new PluginResolver(this.plugins, this.settings);
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

  private destroy = async (visible: Visible): Promise<void> => {
    await visible.quit();
  };
}
