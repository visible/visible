#!/usr/bin/env node
import yargs from 'yargs';
import { table } from 'table';
import { Spinner } from 'cli-spinner';
import chalk from 'chalk';
import { visible } from '@visi/core';
import { Report } from '@visi/core/dist/domain/report';

const loading = (message: string) => {
  const spinner = new Spinner(message).setSpinnerString(18).start();

  return () => {
    const stream = spinner.stop().stream;
    spinner.clearLine(stream);
  };
};

const print = (reportsInput: Report[], json: boolean, verbose: boolean) => {
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
      chalk.bold('Kind'),
      chalk.bold('Type'),
      chalk.bold('Message'),
      chalk.bold('HTML'),
    ],
    ...reports.map(report => {
      const type = {
        ok: chalk.green('ok'),
        warn: chalk.yellow('warn'),
        error: chalk.red('error'),
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

yargs.command(
  '*',
  'the default command',
  yargs =>
    yargs
      .option('url', {
        description: 'URL to diagnosis',
        type: 'string',
        required: true,
      })
      .option('json', {
        description: 'Output JSON instead of prettified table',
        type: 'boolean',
        default: false,
      })
      .option('verbose', {
        description: 'Prints all reports including passed one',
        type: 'boolean',
        default: false,
      }),

  async ({ url, json, verbose }) => {
    try {
      const loaded = loading('Fetching diagnosises...');
      const reports = await visible({ url });
      loaded();
      print(reports, json, verbose);

      const hasError = reports.some(report => report.type === 'error');
      process.exit(hasError ? 1 : 0);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      process.exit(1);
    }
  },
).argv;
