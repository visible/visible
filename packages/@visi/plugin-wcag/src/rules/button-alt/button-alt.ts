import { Context, Impact, Outcome, Rule, RuleType } from '@visi/core';

import { BLINDNESS, BOT, LOW_VISION } from '../keywords';

export class ButtonAlt implements Rule {
  id = '@visi/plugin-wcag/button-alt';
  type = RuleType.ATOMIC;
  name = 'Button Alternative Text';
  description = 'Check if button has text content';
  keywords = [BLINDNESS, LOW_VISION, BOT];

  async create(ctx: Context): Promise<void> {
    const [isApplicable, xpaths] = await ctx.session.runScript<
      [boolean, string[]]
    >(`
      (() => {
        const buttons = visible.$$('button');

        const violations = buttons
          .filter(elm => {
            const alt = elm.textContent;
            return alt == null || alt === '';
          })
          .map(elm => visible.createXPath(elm));

        return [buttons.length !== 0, violations];
      })();
    `);

    if (!isApplicable) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        ruleId: this.id,
        target: '/html',
      });
    }

    if (xpaths.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.PASSED,
        ruleId: this.id,
        target: '/html',
      });
    }

    for (const xpath of xpaths) {
      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        ruleId: this.id,
        target: xpath,
        impact: Impact.CRITICAL,
        message:
          'You must include texts to describe the role of the button ' +
          'for user agents where icons or images are not available.',
      });
    }
  }
}
