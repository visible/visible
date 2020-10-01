import {
  Context,
  Difficulty,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
import { outdent } from 'outdent';

import { isAccessibleName } from '../../utils/is-accessible-name';
import { truncate } from '../../utils/truncate';
import { BLINDNESS, BOT, LOW_VISION } from '../keywords';

export class ButtonAlt implements Rule {
  id = '@visi/plugin-wcag/button-alt';
  type = RuleType.ATOMIC;
  name = 'Button Alternative Text';
  description = 'Check if button has text content';
  keywords = [BLINDNESS, LOW_VISION, BOT];

  async create(ctx: Context): Promise<void> {
    const dto = await ctx.session.runScript<[string, string][]>(`
      visible
        .$$('button')
        .map((elm) => [visible.createXPath(elm), elm.textContent]);
    `);

    if (dto.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    for (const [xpath, textContent] of dto) {
      if (isAccessibleName(textContent)) {
        const truncatedText = truncate(textContent);

        await ctx.reportHTML({
          target: xpath,
          outcome: Outcome.PASSED,
          message: outdent({ newline: ' ' })`
            The name "${truncatedText}" is used for describing the role of
            the button by user-agents where images are not available.
          `,
        });
        continue;
      }

      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        target: xpath,
        impact: Impact.CRITICAL,
        difficulty: Difficulty.EASY,
        message: outdent({ newline: ' ' })`
          You must include texts to describe the role of the button
          for user agents where icons or images are not available.
        `,
      });
    }
  }
}
