import {
  Context,
  Difficulty,
  HTMLNode,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
import { ElementType } from 'domelementtype';
import { DataNode, Element } from 'domhandler';

import { ADHD, BLINDNESS, ESSENTIAL_TREMOR, RSI } from '../keywords';

export class BypassBlocks implements Rule {
  id = '@visi/plugin-wcag/bypass-blocks';
  type = RuleType.ATOMIC;
  name = 'Bypass Blocks';
  description =
    'Check if the webpage has either landmark elements or bypass links';
  keywords = [BLINDNESS, RSI, ADHD, ESSENTIAL_TREMOR];

  async create(ctx: Context): Promise<void> {
    const hasLandmarks = await ctx.session.runScript(`
      document.querySelector('header') &&
      document.querySelector('main') &&
      document.querySelector('footer');
    `);

    const hasAnchorLinks = await ctx.session.runScript(`
      visible
        .$$('a')
        .map((anchor) => anchor.getAttribute('href'))
        .some((href) => href.includes('#'));
    `);

    if (hasLandmarks || hasAnchorLinks) {
      return ctx.reportHTML({
        target: '/html',
        outcome: Outcome.PASSED,
      });
    }

    await ctx.reportHTML({
      outcome: Outcome.FAIL,
      target: '/html/body',
      impact: Impact.CRITICAL,
      difficulty: Difficulty.MEDIUM,
      message:
        'You must use landmarks in markups or provide a bypass to prevent' +
        'screen readers from reading repeated content in multiple pages. ' +
        'Landmarks are also used for indicating the role of elements to crawlers',
      async fix(node: HTMLNode) {
        const body = node.value;
        if (!(body instanceof Element)) return node;

        const firstElm = body.children.find((node) => node instanceof Element);
        if (!(firstElm instanceof Element)) return node;

        if (firstElm.attribs.id == null) {
          firstElm.attribs.id = 'main';
        }

        const id = firstElm.attribs.id;
        const anchor = new Element('a', { href: `#${id}` });
        const text = new DataNode(ElementType.Text, 'Jump to the content');
        anchor.children.push(text);
        body.children.unshift(anchor);

        return node;
      },
    });
  }
}
