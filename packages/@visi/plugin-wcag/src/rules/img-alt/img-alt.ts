import { Context, HTMLNode, Impact, Outcome, Rule, RuleType } from '@visi/core';
import { Element } from 'domhandler';

import { BLINDNESS, BOT, LOW_VISION } from '../keywords';

export class ImgAlt implements Rule {
  id = '@visi/plugin-wcag/img-alt';
  name = 'Image Alternative Text';
  type = RuleType.ATOMIC;
  description = 'Check if img element has an alt attribute';
  keywords = [BLINDNESS, LOW_VISION, BOT];

  async create(ctx: Context): Promise<void> {
    const [isApplicable, xpaths] = await ctx.session.runScript<
      [boolean, string[]]
    >(`
      (() => {
        const images = visible.$$('img')

        const violations = images.filter(elm => {
            const alt = elm.getAttribute('alt');
            return alt == null || alt === '';
          })
          .map(elm => visible.createXPath(elm));

        return [images.length, violations];
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
          'You must set an `alt` attribute for the `img` element for ' +
          'providing a description of the image for user agents such as ' +
          'screen readers or crawlers that are not able to view images.',
        async fix(node) {
          if (
            !(node instanceof HTMLNode) ||
            !(node.value instanceof Element) ||
            !ctx.provider.imageToText
          ) {
            return node;
          }

          const { src } = node.value.attribs;
          const text = await ctx.provider.imageToText(src);

          if (text != null) {
            node.value.attribs.alt = text;
          }

          return node;
        },
      });
    }
  }
}
