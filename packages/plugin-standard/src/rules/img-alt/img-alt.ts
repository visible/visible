import { Context, Outcome, Rule, RuleType } from '@visi/core';
import { Element } from 'domhandler';

export class ImgAlt implements Rule {
  id = '@visi/plugin-standard/img-alt';
  type = RuleType.ATOMIC;
  description = 'Check if img element has an alt attribute';

  async create(ctx: Context) {
    const xpaths = await ctx.driver.runScript<string[]>(`
      visible.$$('img')
        .filter(elm => {
          const alt = elm.getAttribute('alt');
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
        message: 'Img element must have an alt attribute',
        async fix() {
          if (!(node instanceof Element) || !ctx.provider.imageToText) {
            return;
          }

          const { src } = node.attribs;
          const text = await ctx.provider.imageToText(src);
          node.attribs.alt = text;
        },
      });
    }
  }
}
