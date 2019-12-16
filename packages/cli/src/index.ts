#!/usr/bin/env node
import yargs from 'yargs';
import { table } from 'table';
import { Spinner } from 'cli-spinner';
import chalk from 'chalk';
import { visible } from '@visi/core';
import { Report } from '@visi/core/dist/domain/report';
import * as i18next from 'i18next';
import { createI18n } from './i18n';

const loading = (message: string) => {
  const spinner = new Spinner(message).setSpinnerString(18).start();

  return () => {
    const stream = spinner.stop().stream;
    spinner.clearLine(stream);
  };
};

const print = (
  reportsInput: Report[],
  json: boolean,
  verbose: boolean,
  i18n: i18next.i18n,
) => {
  const reports = reportsInput.filter(report => {
    if (verbose) {
      return true;
    }

    return report.type !== 'ok';
  });

  if (json) {
    // eslint-disable-next-line no-console
    return console.log(JSON.stringify(reports));
  }

  const rows = [
    [
      chalk.bold(i18n.t('cli:table.kind', 'Kind')),
      chalk.bold(i18n.t('cli:table.type', 'Type')),
      chalk.bold(i18n.t('cli:table.message', 'Message')),
      chalk.bold(i18n.t('cli:table.html', 'HTML')),
    ],
    ...reports.map(report => {
      const type = {
        ok: chalk.green(i18n.t('cli:table.ok', 'OK')),
        warn: chalk.yellow(i18n.t('cli:table.warn', 'Warn')),
        error: chalk.red(i18n.t('cli:table.error', 'Error')),
      }[report.type];

      const html = report.html ? report.html.substr(0, 100) : '';

      return [type, report.id, report.message, html];
    }),
  ];

  const output = table(rows, {
    columnDefault: {
      truncate: 50,
      alignment: 'left',
    },
  });

  // eslint-disable-next-line no-console
  return console.log(output);
};

const main = async () => {
  const language = 'ja';
  const i18n = await createI18n(language);

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
        const reports = await visible({ url, language });

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
