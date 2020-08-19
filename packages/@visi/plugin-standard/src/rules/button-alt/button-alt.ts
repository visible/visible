import { Context, Outcome, Rule, RuleType } from '@visi/core';

export class ButtonAlt implements Rule {
  id = '@visi/plugin-standard/button-alt';
  type = RuleType.ATOMIC;
  description = 'Check if button has text content';

  async create(ctx: Context): Promise<void> {
    const xpaths = await ctx.session.runScript<string[]>(`
      visible.$$('button')
        .filter(elm => {
          const alt = elm.textContent;
          return alt == null || alt === '';
        })
        .map(elm => visible.createXPath(elm));
    `);

    for (const xpath of xpaths) {
      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        ruleId: this.id,
        target: xpath,
        message: 'Button element must have a text content',
      });
    }
  }
}
