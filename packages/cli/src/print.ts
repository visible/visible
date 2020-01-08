import { table } from 'table';
import chalk from 'chalk';
import { Report } from '@visi/core/main';
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
      chalk.bold(t('result.type', 'Type')),
      chalk.bold(t('result.message', 'Message')),
      chalk.bold(t('result.xpath', 'XPath')),
      chalk.bold(t('result.html', 'HTML')),
    ],
    ...reports.map(report => {
      let color;

      switch (report.level) {
        case 'ok':
          color = chalk.red;
          break;
        case 'warn':
          color = chalk.yellow;
          break;
        case 'error':
        default:
          color = chalk.red;
          break;
      }

      const xpath = report.content && report.content.xpath;

      const html =
        report.content && report.content.html
          ? report.content.html.substr(0, 100)
          : '';

      return [color(report.type), report.message, xpath, html];
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
