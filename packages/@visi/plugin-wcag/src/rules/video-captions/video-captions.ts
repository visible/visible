import {
  Context,
  Difficulty,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';

import { BOT, DEAFNESS, HARD_OF_HEARING } from '../keywords';

export class VideoCaptions implements Rule {
  id = '@visi/plugin-wcag/video-caption';
  type = RuleType.ATOMIC;
  name = 'Video Captions';
  description = 'Check if a video has captions';
  keywords = [BOT, HARD_OF_HEARING, DEAFNESS];

  async create(ctx: Context): Promise<void> {
    const [isApplicable, xpaths] = await ctx.session.runScript<
      [boolean, string[]]
    >(`
      (() => {
        const videos = visible.$$('video');

        const violations = videos
          .filter((video) => {
            const childrenTags = Array.from(video.children).map((child) => child.tagName);
            return !childrenTags.includes('TRACK');
          })
          .map((video) => visible.createXPath(video));

        return [videos.length !== 0, violations];
      })();
    `);

    if (!isApplicable) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    if (xpaths.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.PASSED,
        target: '/html',
      });
    }

    for (const xpath of xpaths) {
      ctx.reportHTML({
        outcome: Outcome.FAIL,
        impact: Impact.CRITICAL,
        difficulty: Difficulty.DIFFICULT,
        target: xpath,
        message:
          'You must include `track` elements as a child of `video` elements ' +
          'to providing the alternative of audios for user agents that cannot use audios.',
      });
    }
  }
}
