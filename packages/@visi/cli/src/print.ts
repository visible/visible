import { codeFrameColumns } from '@babel/code-frame';
import { Outcome, Source } from '@visi/core';
import chalk from 'chalk';
import diff from 'cli-diff';

// import { i18next } from './i18next';
// const t = i18next.t.bind(i18next);

const colors = {
  [Outcome.FAIL]: chalk.bgRed,
  [Outcome.INAPPLICABLE]: chalk.bgGrey,
  [Outcome.PASSED]: chalk.bgGreen,
};

export const print = (
  sources: Source[],
  originals: Map<string, string>,
  json: boolean,
  _fix: boolean,
): void => {
  let output = '';

  if (json) {
    output = JSON.stringify(
      sources,
      (key, value) => {
        if (key === 'content') return;
        if (key === 'node') return;
        return value;
      },
      2,
    );
  }

  for (const source of sources) {
    const original = originals.get(source.id);

    if (original == null) {
      continue;
    }

    for (const report of source.reports) {
      const title = colors[report.outcome](report.ruleId);
      const message = report.message ?? 'No message provided';

      output += `${title} ${message}\n`;

      if (report.location != null) {
        const frame = codeFrameColumns(
          original,
          {
            start: {
              line: report.location.startLine,
              column: report.location.startColumn,
            },
            end: {
              line: report.location.endLine,
              column: report.location.endColumn,
            },
          },
          { highlightCode: true },
        );

        output += frame + '\n';
      }
    }

    if (original !== source.text) {
      output += chalk.bgGrey(
        `Suggested change for ${source.url ?? 'the file'}:\n`,
      );
      output += diff(original, source.text);
    }
  }

  // eslint-disable-next-line no-console
  return console.log(output);
};
