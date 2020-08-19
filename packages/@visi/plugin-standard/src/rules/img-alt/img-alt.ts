import { Context, Outcome, Rule, RuleType } from '@visi/core';
import { Element } from 'domhandler';

export class ImgAlt implements Rule {
  id = '@visi/plugin-standard/img-alt';
  type = RuleType.ATOMIC;
  description = 'Check if img element has an alt attribute';

  async create(ctx: Context): Promise<void> {
    const xpaths = await ctx.session.runScript<string[]>(`
      visible.$$('img')
        .filter(elm => {
          const alt = elm.getAttribute('alt');
          return alt == null || alt === '';
        })
        .map(elm => visible.createXPath(elm));
    `);

    for (const xpath of xpaths) {
      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        ruleId: this.id,
        target: xpath,
        message: 'Img element must have an alt attribute',
        async fix(node) {
          if (!(node instanceof Element) || !ctx.provider.imageToText) {
            return node;
          }

          const { src } = node.attribs;
          const text = await ctx.provider.imageToText(src);
          if (text != null) {
            node.attribs.alt = text;
          }

          return node;
        },
      });
    }
  }
}
