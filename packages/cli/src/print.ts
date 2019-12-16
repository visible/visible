import { table } from 'table';
import chalk from 'chalk';
import { Report } from '@visi/core/dist/domain/report';
import * as i18next from 'i18next';

export const print = async (
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
      chalk.bold(i18n.t('cli:result.kind', 'Kind')),
      chalk.bold(i18n.t('cli:result.type', 'Type')),
      chalk.bold(i18n.t('cli:result.message', 'Message')),
      chalk.bold(i18n.t('cli:result.html', 'HTML')),
    ],
    ...reports.map(report => {
      const type = {
        ok: chalk.green(i18n.t('cli:result.ok', 'OK')),
        warn: chalk.yellow(i18n.t('cli:result.warn', 'Warn')),
        error: chalk.red(i18n.t('cli:result.error', 'Error')),
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
