#!/usr/bin/env node
import { Config, Visible } from '@visi/core/main';
import chalk from 'chalk';
import { Presets, SingleBar } from 'cli-progress';
import { cosmiconfig } from 'cosmiconfig';
import { promises as fs } from 'fs';
import {
  filter,
  finalize,
  first,
  mergeAll,
  pluck,
  toArray,
} from 'rxjs/operators';
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

    async ({ url, json, verbose, silent, fix }) => {
      const config = await cosmiconfig('visible')
        .search()
        .then((result) => result?.config as Config | undefined);

      if (config === undefined) {
        // eslint-disable-next-line no-console
        console.error(t('visible.no-rc', 'No visiblerc file found'));
        process.exit(1);
      }

      const singleBar = new SingleBar(
        { clearOnComplete: true },
        Presets.shades_classic,
      );

      const visible = await Visible.init(config);
      await visible.open(url);
      const letterhead = await visible.fetchLetterhead();
      const progress$ = visible.diagnose();

      if (!silent) {
        progress$.pipe(first()).subscribe((progress) => {
          // eslint-disable-next-line no-console
          console.log(
            chalk.grey(
              t('visible.start', '🦉 Diagnosing "{{name}}" at {{url}}...', {
                name: letterhead.title,
                url: letterhead.url,
              }),
            ),
          );

          singleBar.start(progress.totalCount, 0);
        });

        progress$
          .pipe(finalize(() => singleBar.stop()))
          .subscribe((progress) => {
            singleBar.update(progress.doneCount);
          });
      }

      progress$
        .pipe(
          pluck('report'),
          filter((report) => verbose || report.outcome === 'fail'),
          toArray(),
          mergeAll(),
          finalize(() => visible.close()),
        )
        .subscribe((report) => {
          const sources = visible.getSources();
          print(report, sources, json, fix);
        });
    },
  ).argv;
