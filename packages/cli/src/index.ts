#!/usr/bin/env node
import { visible } from '@visi/core/main';
import { cosmiconfig } from 'cosmiconfig';
import { promises as fs } from 'fs';
import { count, filter, finalize, mergeAll, pluck } from 'rxjs/operators';
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
    yargs =>
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
        .option('verbose', {
          description: t(
            'options.verbose',
            'Prints all reports including passed one',
          ),
          type: 'boolean',
          default: false,
        }),

    async ({ url, json, verbose, fix }) => {
      const config = await cosmiconfig('visible')
        .search()
        .then(result => result?.config);

      if (!config) {
        throw new Error(t('visible.no-rc', 'No visiblerc file found'));
      }

      const visi = await visible({ config, url });

      const diagnosis$ = visi.diagnose().pipe(
        finalize(() => visi.cleanup),
        pluck('reports'),
        mergeAll(),
      );

      diagnosis$
        .pipe(filter(report => !verbose && report.level !== 'ok'))
        .subscribe(report => {
          print(report, json, t, fix);
        });

      diagnosis$
        .pipe(count(report => report.level !== 'ok'))
        .subscribe(errors => process.exit(errors > 0 ? 1 : 0));
    },
  ).argv;
