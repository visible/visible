import { table } from 'table';
import chalk from 'chalk';
import { Report } from '@visi/core/dist/domain/report';
import { TFunction } from 'i18next';

export const print = async (
  reportsInput: Report[],
  json: boolean,
  verbose: boolean,
  t: TFunction,
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
      chalk.bold(t('cli:result.kind', 'Kind')),
      chalk.bold(t('cli:result.type', 'Type')),
      chalk.bold(t('cli:result.message', 'Message')),
      chalk.bold(t('cli:result.html', 'HTML')),
    ],
    ...reports.map(report => {
      const type = {
        ok: chalk.green(t('cli:result.ok', 'OK')),
        warn: chalk.yellow(t('cli:result.warn', 'Warn')),
        error: chalk.red(t('cli:result.error', 'Error')),
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
