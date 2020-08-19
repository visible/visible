#!/usr/bin/env node
import { Config, PluginResolver, Visible } from '@visi/core';
import chalk from 'chalk';
import { Presets, SingleBar } from 'cli-progress';
import { cosmiconfig } from 'cosmiconfig';
import { promises as fs } from 'fs';
import mkdirp from 'mkdirp';
import { finalize, first, last } from 'rxjs/operators';
import yargs from 'yargs';

import { ConfigLoader } from './config';
import { i18next, initI18next } from './i18next';
import { loadPlugins } from './load-plugins';
import { print } from './print';

initI18next();
const t = i18next.t.bind(i18next);

yargs
  .command(
    'init',
    t('visible.init.description', 'Initialize .visiblerc file') as string,
    {},
    async () => {
      const defaultConfig = {
        extends: [],
        plugins: ['@visi/plugin-standard'],
        settings: {},
        rules: {},
      };

      await fs.writeFile(
        '.visiblerc.json',
        JSON.stringify(defaultConfig, undefined, 2),
      );

      // eslint-disable-next-line no-console
      console.log(t('visible.init.done', '🎉 Initialization completed!!'));
    },
  )
  .command(
    '*',
    t('visible.description', 'The default command') as string,
    (yargs) =>
      yargs
        .option('url', {
          description: t('options.url', 'URL to diagnose'),
          type: 'string',
          required: true,
        })
        .option('json', {
          description: t(
            'options.json',
            'Output JSON instead of prettified table',
          ),
          type: 'boolean',
          default: false,
        })
        .option('fix', {
          description: t('options.fix', 'Prints fixers'),
          type: 'boolean',
          default: false,
        })
        .option('silent', {
          description: t('options.silent', 'Disables progress bar'),
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: t(
            'options.verbose',
            'Prints all reports including passed one',
          ),
          type: 'boolean',
          default: false,
        }),

    async ({ url, json, silent, fix }) => {
      const rawConfig = await cosmiconfig('visible')
        .search()
        .then((result) => result?.config as Config | undefined);

      if (rawConfig === undefined) {
        // eslint-disable-next-line no-console
        console.error(t('visible.no-rc', 'No visiblerc file found'));
        process.exit(1);
      }

      const singleBar = new SingleBar(
        { clearOnComplete: true },
        Presets.shades_classic,
      );

      // Create config object from raw config
      const config = await ConfigLoader.init(rawConfig);

      // Load plugins from its names
      const plugins = await loadPlugins(config.plugins);

      // Make resolver: a factory that instantiates a plugin
      const resolver = new PluginResolver(plugins, config.settings);
      await mkdirp(resolver.settings.screenshotDir);

      // Up driver
      const driver = await resolver.getDriverFactory(config.driver).create();

      // Finally, init Visible
      const visible = new Visible(
        resolver.settings,
        driver,
        resolver.getRules(config.rules),
        resolver.getProvider(config.providers),
      );

      const diagnosis$ = visible.diagnose(url);

      if (!silent) {
        diagnosis$.pipe(first()).subscribe((progress) => {
          // eslint-disable-next-line no-console
          console.log(chalk.grey(t('visible.start', '🦉 Diagnosing...')));
          singleBar.start(progress.totalCount, 0);
        });

        diagnosis$
          .pipe(finalize(() => singleBar.stop()))
          .subscribe((progress) => {
            singleBar.update(progress.doneCount);
          });
      }

      const { sources: sourcesMap } = await diagnosis$.pipe(last()).toPromise();
      const sources = [...sourcesMap.values()];
      await print(sources, json, fix);

      const hasAnyReport = sources.some((source) => {
        return source.reports.length !== 0;
      });

      // Down driver so that chromium process exits
      // await driver.quit();

      // eslint-disable-next-line no-console
      console.log(
        chalk.grey(
          t('visible.end', '🦉 Diagnostics has successfully completed'),
        ),
      );

      process.exit(hasAnyReport ? 1 : 0);
    },
  ).argv;
