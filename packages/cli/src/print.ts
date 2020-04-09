const makeCodeFrame = require('@babel/code-frame').default;
import { Report, ReportLevel } from '@visi/core/main';
import chalk from 'chalk';
// import { highlight } from 'cli-highlight';
import { TFunction } from 'i18next';
import prettier from 'prettier';

const mapLevelToColor = (level: ReportLevel) => {
  switch (level) {
    case 'error':
      return chalk.red;
    case 'warn':
      return chalk.yellow;
    case 'ok':
      return chalk.green;
    default:
      return chalk.white;
  }
};

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

    return report.level !== 'ok';
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

  const output = reports.reduce((result, report) => {
    const source = report.content?.html ?? '';
    const formattedSource = prettier.format(source, { parser: 'html' });

    const codeFrame = makeCodeFrame(formattedSource, 1, 0, {
      highlightCode: true,
    });

    return (
      result +
      [
        mapLevelToColor(report.level).bold(report.rule + ': ') + report.message,
        codeFrame,
        chalk.italic.grey('location: ' + report.content?.xpath),
        '\n',
      ].join('\n')
    );
  }, '');

  // eslint-disable-next-line no-console
  return console.log(output);
};
