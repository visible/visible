#!/usr/bin/env node
import yargs from 'yargs';
import { visible } from '@visi/core';
import { print } from './print';
import { loader } from './loader';
import { createI18n } from './i18n';

(async () => {
  const [i18next, t] = await createI18n();
  const description = t('cli:visible.description', 'The default command');

  yargs.command(
    '*',
    description,
    yargs =>
      yargs
        .option('url', {
          description: t('cli:options.url', 'URL to diagnose'),
          type: 'string',
          required: true,
        })
        .option('json', {
          description: t(
            'cli:options.json',
            'Output JSON instead of prettified table',
          ),
          type: 'boolean',
          default: false,
        })
        .option('fix', {
          description: t('cli:options.fix', 'Prints fixers'),
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: t(
            'cli:options.verbose',
            'Prints all reports including passed one',
          ),
          type: 'boolean',
          default: false,
        }),

    async ({ url, json, verbose, fix }) => {
      try {
        const reports = await loader(
          t('cli:loading', 'Fetching diagnosises...'),
          visible({ url, language: i18next.language }),
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
