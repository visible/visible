#!/usr/bin/env node
import yargs from 'yargs';
import { Spinner } from 'cli-spinner';
import { visible } from '@visi/core';
import { print } from './print';
import { createI18n } from './i18n';

const loading = (message: string) => {
  const spinner = new Spinner(message).setSpinnerString(18).start();

  return () => {
    const stream = spinner.stop().stream;
    spinner.clearLine(stream);
  };
};

const main = async () => {
  const i18n = await createI18n();

  yargs.command(
    '*',
    'the default command',
    yargs =>
      yargs
        .option('url', {
          description: i18n.t('cli:options.url', 'URL to diagnose'),
          type: 'string',
          required: true,
        })
        .option('json', {
          description: i18n.t(
            'cli:options.json',
            'Output JSON instead of prettified table',
          ),
          type: 'boolean',
          default: false,
        })
        .option('verbose', {
          description: i18n.t(
            'cli:options.verbose',
            'Prints all reports including passed one',
          ),
          type: 'boolean',
          default: false,
        }),

    async ({ url, json, verbose }) => {
      try {
        const loaded = loading(
          i18n.t('cli:loading', 'Fetching diagnosises...'),
        );
        const reports = await visible({ url, i18n });

        loaded();
        print(reports, json, verbose, i18n);

        const hasError = reports.some(report => report.type === 'error');
        process.exit(hasError ? 1 : 0);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e);
        process.exit(1);
      }
    },
  ).argv;
};

main();
