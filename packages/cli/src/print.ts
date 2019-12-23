import { table } from 'table';
import chalk from 'chalk';
import { Report } from '@visi/core/dist/domain/report';
import { TFunction } from 'i18next';

export const print = async (
  reportsInput: Report[],
  json: boolean,
  verbose: boolean,
  t: TFunction,
  fix: boolean,
) => {
  const reports = reportsInput.filter(report => {
    if (verbose) {
      return true;
    }

    return report.type !== 'ok';
  });

  const fixtures = [];

  if (fix) {
    for (const report of reports) {
      if (report.fix) {
        const fixture = await report.fix();
        fixtures.push(fixture);
      }
    }
  }

  if (json) {
    // eslint-disable-next-line no-console
    return console.log(JSON.stringify([reports, fixtures]));
  }

  const rows = [
    [
      chalk.bold(t('result.kind', 'Kind')),
      chalk.bold(t('result.type', 'Type')),
      chalk.bold(t('result.message', 'Message')),
      chalk.bold(t('result.html', 'HTML')),
    ],
    ...reports.map(report => {
      const type = {
        ok: chalk.green(t('result.ok', 'OK')),
        warn: chalk.yellow(t('result.warn', 'Warn')),
        error: chalk.red(t('result.error', 'Error')),
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
