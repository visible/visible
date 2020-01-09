#!/usr/bin/env node
import yargs from 'yargs';
import { cosmiconfig } from 'cosmiconfig';
import { visible } from '@visi/core/main';
import { print } from './print';
import { loader } from './loader';
import { createI18n } from './i18n';

(async () => {
  const [, t] = await createI18n();
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
        const cosmiconfigResult = await cosmiconfig('visible').search();

        if (!cosmiconfigResult?.config) {
          throw new Error(t('visible.no-rc', 'No visiblerc file found'));
        }

        const { config } = cosmiconfigResult;

        const reports = await loader(
<<<<<<< HEAD
          t('loading', 'Fetching diagnoses...'),
=======
          t('visible.loading', 'Fetching diagnoses...'),
>>>>>>> ab40e0e6a77b0704ce30b3bb20286ff74a9da79c
          visible({ config, url }),
        );

        await print(reports, json, verbose, t, fix);

        const hasError = reports.some(report => report.level === 'error');
        process.exit(hasError ? 1 : 0);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
      }
    },
  ).argv;
})();
