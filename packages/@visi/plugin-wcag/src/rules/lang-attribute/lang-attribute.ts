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

import { BLINDNESS, BOT, DYSLEXIA } from '../keywords';

export class LangAttribute implements Rule {
  id = '@visi/plugin-wcag/lang-attribute';
  type = RuleType.ATOMIC;
  name = 'Lang Attribute';
  description = 'Check if html element has proper lang attribute';
  keywords = [BLINDNESS, BOT, DYSLEXIA];

  async create(ctx: Context): Promise<void> {
    const result = await ctx.session.findHTML('/html');
    if (result == null) return;
    const [, node] = result;

    if (!(node instanceof Element)) {
      return;
    }

    if (node.attribs.lang != null) {
      return ctx.reportHTML({
        outcome: Outcome.PASSED,
        target: '/html',
        message: outdent({ newline: ' ' })`
          The \`html\` element has a \`lang\` attribute "${node.attribs.lang}"
          so user-agents such as screen readers are able to recognize
          the language of the website and read the contents properly.
        `,
      });
    }

    // TODO: Cannot use session inside fix
    const title = await ctx.session.getTitle();

    await ctx.reportHTML({
      outcome: Outcome.FAIL,
      impact: Impact.CRITICAL,
      difficulty: Difficulty.EASY,
      target: '/html',
      message: outdent({ newline: ' ' })`
        You must set \`lang\` attribute for the \`html\` element at the root
        to describe the language of the website explicitly to user agents.
        This information would also be used by screen readers as a language to use in speaking.
      `,
      async fix(node: HTMLNode) {
        if (
          ctx.provider.textToLanguage == null ||
          !(node instanceof HTMLNode) ||
          !(node.value instanceof Element)
        ) {
          return node;
        }

        const lang = await ctx.provider.textToLanguage(title);
        node.value.attribs.lang = lang;

        return node;
      },
    });
  }
}
