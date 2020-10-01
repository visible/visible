import {
  Context,
  CSSNode,
  Difficulty,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
import { outdent } from 'outdent';
import polished from 'polished';

import { COLOR_BLINDNESS } from '../keywords';

type DTO = { xpath: string; fg: string; bg: string };

export class Contrast implements Rule {
  id = '@visi/plugin-wcag/contrast';
  type = RuleType.ATOMIC;
  name = 'Contrast';
  description = 'Checks if elements has enough color contrasts';
  keywords = [COLOR_BLINDNESS];

  async create(ctx: Context): Promise<void> {
    const elms = await ctx.session.runScript<DTO[]>(`
      visible
        .$$('*')
        .filter((elm) => elm.textContent !== '')
        .map((elm) => {
          const style = getComputedStyle(elm);

          return {
            xpath: visible.createXPath(elm),
            fg: style.getPropertyValue('color'),
            bg: style.getPropertyValue('background-color'),
          };
        })
        .filter((dto) => dto.fg && dto.bg);
    `);

    if (elms.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    for (const elm of elms) {
      if (polished.getContrast(elm.fg, elm.bg) >= 4.5) {
        await ctx.reportCSS({
          outcome: Outcome.PASSED,
          target: elm.xpath,
          propertyName: 'background-color',
          message: outdent({ newline: ' ' })`
            The color contrast ratio of the background \`${elm.bg}\`
            to the foreground \`${elm.fg}\` complies 4.5 color contrast ratio
            so users who have color blindness can identify the content easier.
          `,
        });
        continue;
      }

      try {
        await ctx.reportCSS({
          outcome: Outcome.FAIL,
          target: elm.xpath,
          propertyName: 'background-color',
          impact: Impact.SERIOUS,
          difficulty: Difficulty.DIFFICULT,
          message: outdent({ newline: ' ' })`
            The color contrast ratio of foreground \`${elm.fg}\` to
            background ${elm.bg} is must be greater than 4.5
            as users with color blindness may not be able to identify the content.
          `,
          async fix(node: CSSNode) {
            if (node.value.type !== 'decl') return node;
            node.value.value = polished.darken(0.8, node.value.value);
            return node;
          },
        });
      } catch {
        // TODO: Property returned from getComputedStyle might be inherited from its parent
      }
    }
  }
}
