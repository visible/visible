#!/usr/bin/env node
import yargs from 'yargs';
import { table } from 'table';
import { Spinner } from 'cli-spinner';
import chalk from 'chalk';
import { visible } from '@visi/core';

const loading = (message: string) => {
  const spinner = new Spinner(message).setSpinnerString(18).start();

  return () => {
    const stream = spinner.stop().stream;
    spinner.clearLine(stream);
  };
};

yargs.command(
  '*',
  'the default command',
  yargs =>
    yargs.option('url', {
      description: 'URL to diagnosis',
      type: 'string',
      required: true,
    }),

  async ({ url }) => {
    const loaded = loading('Fetching diagnosises...');
    const reports = await visible({ url });
    loaded();

    const rows = [
      [chalk.bold('Kind'), chalk.bold('Type'), chalk.bold('HTML')],
      ...reports.map(report => {
        const type = {
          ok: chalk.green('ok'),
          warn: chalk.yellow('warn'),
          error: chalk.red('error'),
        }[report.type];

        return [type, report.id, report.html ? report.html : ''];
      }),
    ];

    const output = table(rows, { columns: { 2: { width: 100 } } });

    // eslint-disable-next-line no-console
    console.log('\n' + output);

    const hasError = reports.some(report => report.type === 'error');
    process.exit(hasError ? 1 : 0);
  },
).argv;
