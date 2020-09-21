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
import { replaceElement } from 'domutils';

import { BLINDNESS, BOT, LOW_VISION } from '../keywords';

export class InputLabel implements Rule {
  id = '@visi/plugin-wcag/input-label';
  name = 'Input Label';
  type = RuleType.ATOMIC;
  description = 'Check if an input element has label element';
  keywords = [BLINDNESS, BOT, LOW_VISION];

  // 1. forで指定されていないIDを持つinput
  // 2. labelの子要素に来ていないinput
  // ¬親のタグ名がlabel ∧ ¬forで指定されていない ==> inaccessible
  async create(ctx: Context): Promise<void> {
    const isApplicable = await this.checkApplicability(ctx);

    if (!isApplicable) {
      return ctx.reportHTML({
        outcome: Outcome.INAPPLICABLE,
        target: '/html',
      });
    }

    const unboundInputs = await this.findUnboundInputs(ctx);
    const independentInputs = await this.findIndependentInputs(ctx);

    // get superset
    const xpaths = unboundInputs.filter((input) => {
      return independentInputs.includes(input);
    });

    if (xpaths.length === 0) {
      return ctx.reportHTML({
        outcome: Outcome.PASSED,
        target: '/html',
      });
    }

    for (const xpath of xpaths) {
      await ctx.reportHTML({
        outcome: Outcome.FAIL,
        target: xpath,
        impact: Impact.CRITICAL,
        difficulty: Difficulty.MEDIUM,
        message:
          'You must add `label` element and either set `id` in the `for` ' +
          'attribute or nest as a child, to describe the roles of the `input` element to users.',
        async fix(node: HTMLNode) {
          if (!(node instanceof HTMLNode) || !(node.value instanceof Element)) {
            return node;
          }

          // Create an empty label
          const label = new Element('label', {});
          // Create a mock text
          const text = new DataNode(ElementType.Text, 'Put a description here');

          // Put the node and text to the label
          label.children.push(node.value);
          label.children.push(text);

          // Replace node's parent with the label
          replaceElement(node.value, label);
          return node;
        },
      });
    }
  }

  private checkApplicability(ctx: Context) {
    return ctx.session.runScript<boolean>(`
      visible.$$('input').length !== 0;
    `);
  }

  // Find inputs that aren't bound by label
  private async findUnboundInputs(ctx: Context) {
    return ctx.session.runScript<string[]>(`
      const forIds = visible
        .$$('label')
        .map((label) => label.getAttribute('for'));

      visible
        .$$('input')
        .filter((input) => !forIds.includes(input.id))
        .map((input) => visible.createXPath(input));
    `);
  }

  // Find inputs that aren't nested by label
  private async findIndependentInputs(ctx: Context) {
    return ctx.session.runScript<string[]>(`
      visible
        .$$('input')
        .filter((input) => input.parentElement.tagName !== 'LABEL')
        .map((elm) => visible.createXPath(elm));
    `);
  }
}
