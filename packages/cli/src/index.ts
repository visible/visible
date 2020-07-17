#!/usr/bin/env node
import { ConfigSchema, init } from '@visi/core';
import chalk from 'chalk';
import { Presets, SingleBar } from 'cli-progress';
import { cosmiconfig } from 'cosmiconfig';
import { promises as fs } from 'fs';
import { finalize, first } from 'rxjs/operators';
import yargs from 'yargs';

import { i18next, initI18next } from './i18next';
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
      const config = await cosmiconfig('visible')
        .search()
        .then((result) => result?.config as ConfigSchema | undefined);

      if (config === undefined) {
        // eslint-disable-next-line no-console
        console.error(t('visible.no-rc', 'No visiblerc file found'));
        process.exit(1);
      }

      const singleBar = new SingleBar(
        { clearOnComplete: true },
        Presets.shades_classic,
      );

      const visible = await init(config);

      if (!silent) {
        visible.progress$.pipe(first()).subscribe((progress) => {
          // eslint-disable-next-line no-console
          console.log(chalk.grey(t('visible.start', '🦉 Diagnosing...')));
          singleBar.start(progress.totalCount, 0);
        });

        visible.progress$
          .pipe(finalize(() => singleBar.stop()))
          .subscribe((progress) => {
            singleBar.update(progress.doneCount);
          });
      }

      const sources = await visible.diagnose(url);
      print(sources, visible.originals, json, fix);
    },
  ).argv;
