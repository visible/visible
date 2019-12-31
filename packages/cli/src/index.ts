#!/usr/bin/env node
import path from 'path';
import yargs from 'yargs';
import { visible, Config } from '@visi/core';
import { print } from './print';
import { loader } from './loader';
import { createI18n } from './i18n';

(async () => {
  const [i18next, t] = await createI18n();
  const description = t('visible.description', 'The default command');

  yargs.command(
    '*',
    description,
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
      try {
        const config: Config = require(path.join(
          process.cwd(),
          '.visiblerc.json',
        ));

        const reports = await loader(
          t('loading', 'Fetching diagnosises...'),
          visible({ config, url, language: i18next.language }),
        );

        await print(reports, json, verbose, t, fix);

        const hasError = reports.some(report => report.type === 'error');
        process.exit(hasError ? 1 : 0);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
      }
    },
  ).argv;
})();
