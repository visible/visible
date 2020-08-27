import { codeFrameColumns } from '@babel/code-frame';
import { immutableFix, Outcome, Source } from '@visi/core';
import chalk from 'chalk';
import diff from 'cli-diff';

// import { i18next } from './i18next';
// const t = i18next.t.bind(i18next);

const colors = {
  [Outcome.FAIL]: chalk.bgRed,
  [Outcome.INAPPLICABLE]: chalk.bgGrey,
  [Outcome.PASSED]: chalk.bgGreen,
};

export const print = async (
  sources: Source[],
  json: boolean,
  fix: boolean,
): Promise<void> => {
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
    for (const report of source.reports) {
      const title = colors[report.outcome](report.ruleId);
      const message = report.message ?? 'No message provided';

      output += `${title} ${message}\n`;

      if (report.node.location == null) {
        continue;
      }

      const frame = codeFrameColumns(
        source.node.text,
        {
          start: {
            line: report.node.location.startLine,
            column: report.node.location.startColumn,
          },
          end: {
            line: report.node.location.endLine,
            column: report.node.location.endColumn,
          },
        },
        { highlightCode: true },
      );

      output += frame + '\n';

      if (fix) {
        continue;
      }

      // eslint-disable-next-line
      const patch = await immutableFix(source, report);
      output += chalk.grey(`Suggested change for ${source.url ?? source.id}\n`);
      output += diff(source.node.text, patch.node.text) + '\n';
    }
  }

  // eslint-disable-next-line no-console
  return console.log(output);
};
