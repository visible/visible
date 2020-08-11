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
      const result = await ctx.session.findHTML(xpath);

      if (result == null) {
        continue;
      }

      const [id, node] = result;

      await ctx.reportHTML(id, {
        outcome: Outcome.FAIL,
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
          if (text != null) {
            node.attribs.alt = text;
          }
        },
      });
    }
  }
}
