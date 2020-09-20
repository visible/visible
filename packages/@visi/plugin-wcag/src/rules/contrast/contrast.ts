import {
  Context,
  CSSNode,
  Difficulty,
  Impact,
  Outcome,
  Rule,
  RuleType,
} from '@visi/core';
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
        .$$('html > body > *')
        .map((elm) => {
          const style = getComputedStyle(elm);
          const fg = style.getPropertyValue('color');
          const bg = style.getPropertyValue('background-color');

          return {
            xpath: visible.createXPath(elm),
            fg,
            bg,
          };
        })
        .filter((dto) => dto.fg && dto.bg);
    `);

    if (elms.length === 0) {
      try {
        return ctx.reportCSS({
          outcome: Outcome.PASSED,
          ruleId: this.id,
          target: '/html/body',
          propertyName: 'background-color',
        });
      } catch {
        // TODO: What propertyName should be here?
      }
    }

    for (const elm of elms) {
      if (polished.getContrast(elm.fg, elm.bg) >= 4.5) return;

      try {
        await ctx.reportCSS({
          outcome: Outcome.FAIL,
          ruleId: this.id,
          target: elm.xpath,
          propertyName: 'background-color',
          impact: Impact.SERIOUS,
          difficulty: Difficulty.DIFFICULT,
          message:
            'The color contrast ratio must be 4.5 or higher, ' +
            'as users with color blindness may not be able to identify the content.',
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
