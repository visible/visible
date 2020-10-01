import {
  Context,
  Difficulty,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
import { outdent } from 'outdent';

import { BOT, DEAFNESS, HARD_OF_HEARING } from '../keywords';

export class VideoCaptions implements Rule {
  id = '@visi/plugin-wcag/video-caption';
  type = RuleType.ATOMIC;
  name = 'Video Captions';
  description = 'Check if a video has captions';
  keywords = [BOT, HARD_OF_HEARING, DEAFNESS];

  async create(ctx: Context): Promise<void> {
    const dto = await ctx.session.runScript<[string, boolean][]>(`
      visible
        .$$('video')
        .map((video) => [
          visible.createXPath(video),
          Array.from(video.children).map((child) => child.tagName).includes('TRACK'),
        ]);
    `);

    if (dto.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    for (const [xpath, isAccessible] of dto) {
      if (isAccessible) {
        await ctx.reportHTML({
          outcome: Outcome.PASSED,
          target: xpath,
          message: outdent({ newline: ' ' })`
            The \`video\` element has \`track\` elements so users and user-agents
            that are not able to use audio can refer captions instead.
          `,
        });
        continue;
      }

      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        impact: Impact.CRITICAL,
        difficulty: Difficulty.DIFFICULT,
        target: xpath,
        message: outdent({ newline: ' ' })`
          You must include \`track\` elements as a child of \`video\` elements
          to providing the alternative of audios for user agents that cannot use audios.
        `,
      });
    }
  }
}
