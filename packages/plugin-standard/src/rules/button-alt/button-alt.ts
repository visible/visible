import { Context, Outcome, Rule, RuleType } from '@visi/core';

export class ButtonAlt implements Rule {
  id = '@visi/plugin-standard/button-alt';
  type = RuleType.ATOMIC;
  description = 'Check if button has text content';

  async create(ctx: Context) {
    const xpaths = await ctx.driver.runScript<string[]>(`
      visible.$$('button')
        .filter(elm => {
          const alt = elm.textContent;
          return alt == null || alt === '';
        })
        .map(elm => visible.createXPath(elm));
    `);

    for (const xpath of xpaths) {
      const node = ctx.driver.findHtmlNode(xpath);

      if (node == null) {
        continue;
      }

      await ctx.report({
        outcome: Outcome.FAIL,
        sourceId: 'html',
        ruleId: this.id,
        node,
        target: xpath,
        message: 'Button element must have a text content',
      });
    }
  }
}
