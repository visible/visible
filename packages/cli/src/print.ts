import { codeFrameColumns } from '@babel/code-frame';
import { Report, Source } from '@visi/core/main';
import chalk from 'chalk';

import { i18next } from './i18next';

const t = i18next.t.bind(i18next);

export const print = (
  report: Report,
  sources: Map<string, Source>,
  json: boolean,
  _fix: boolean,
) => {
  if (json) {
    // eslint-disable-next-line no-console
    return console.log(JSON.stringify(report, undefined, 2));
  }

  if (report.outcome === 'inapplicable') {
    return;
  }

  const codeFrame = report.pointers
    .map(pointer => {
      const { sourceId, location } = pointer;

      if (!location || !sourceId) {
        return chalk.grey(
          t(
            'code-frame.unavailable',
            '(Code frame is not available for this node)',
          ),
        );
      }

      const source = sources.get(sourceId);
      if (!source) {
        throw new Error(`Unmapped source given ${sourceId}`);
      }

      const loc = {
        start: { line: location.startLine, column: location.startColumn },
        end: { line: location.endLine, column: location.endColumn },
      };

      return codeFrameColumns(source.content, loc, { highlightCode: true });
    })
    .join('\n');

  const output = [
    chalk.bold(
      chalk.red(report.rule.id) +
        ' ' +
        (report.outcome === 'fail' ? report.message : 'passed'),
    ),
    codeFrame,
  ].join('\n');

  // eslint-disable-next-line no-console
  return console.log(output);
};
