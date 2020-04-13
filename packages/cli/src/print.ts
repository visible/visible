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
  report: Report,
  json: boolean,
  t: TFunction,
  fix: boolean,
) => {
  const fixture = fix && report.fix ? await report.fix() : undefined;

  if (json) {
    // eslint-disable-next-line no-console
    return console.log(JSON.stringify([report, fixture]));
  }

  const source = report.content?.html ?? '';
  const formattedSource = prettier.format(source, { parser: 'html' });

  const codeFrame = makeCodeFrame(formattedSource, 1, 0, {
    highlightCode: true,
  });

  const output = [
    mapLevelToColor(report.level).bold(report.rule + ': ') + report.message,
    codeFrame,
    chalk.italic.grey('location: ' + report.content?.xpath),
    '\n',
  ].join('\n');

  // eslint-disable-next-line no-console
  return console.log(output);
};
