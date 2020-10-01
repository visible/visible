import {
  Context,
  Difficulty,
  HTMLNode,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
import { Element } from 'domhandler';
import { outdent } from 'outdent';

import { isAccessibleName } from '../../utils/is-accessible-name';
import { truncate } from '../../utils/truncate';
import { BLINDNESS, BOT, LOW_VISION } from '../keywords';

export class ImgAlt implements Rule {
  id = '@visi/plugin-wcag/img-alt';
  name = 'Image Alternative Text';
  type = RuleType.ATOMIC;
  description = 'Check if img element has an alt attribute';
  keywords = [BLINDNESS, LOW_VISION, BOT];

  async create(ctx: Context): Promise<void> {
    const xpaths = await ctx.session.runScript<string[]>(`
      visible
        .$$('img')
        .map((elm) => visible.createXPath(elm));
    `);

    if (xpaths.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    for (const xpath of xpaths) {
      // TODO: Would be better if we could handle this on the fixer
      // but session closes before fix to be invoked.
      const result = await ctx.session.findHTML(xpath);
      if (result == null) continue;
      const [, node] = result;
      if (!(node instanceof Element) || node.attribs.src == null) continue;
      const url = await ctx.session.resolveURL(node.attribs.src);

      if (isAccessibleName(node.attribs.alt)) {
        const truncatedAlt = truncate(node.attribs.alt);

        await ctx.reportHTML({
          outcome: Outcome.PASSED,
          target: xpath,
          message: outdent({ newline: ' ' })`
           The caption "${truncatedAlt}" is used as an alternative of the
           image by user-agents where images are not available.
          `,
        });
        continue;
      }

      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        target: xpath,
        impact: Impact.CRITICAL,
        difficulty: Difficulty.EASY,
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

          const text = await ctx.provider.imageToText(url);
          node.value.attribs.alt = text ?? 'Put your description here';

          return node;
        },
      });
    }
  }
}
