import { DataNode, Element } from 'domhandler';
import { ElementType, parseDOM } from 'htmlparser2';

import html from '../__fixture__/html';
import root from '../__fixture__/root';
import {
  CSSNode,
  HTMLNode,
  HTMLRootNode,
  Location,
  Outcome,
  Report,
  Source,
  SourceType,
} from '../source';
import { immutableFix } from './immutable-fix';

it('applies fix to HTML without modifying the original', async () => {
  const dom = parseDOM(html, {
    withEndIndices: true,
    withStartIndices: true,
  });

  const source = new Source({
    type: SourceType.HTML,
    node: new HTMLRootNode(dom),
  });

  const report = new Report({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/div/p',
    // eslint-disable-next-line
    node: new HTMLNode((dom[0] as any).children[0]),
    location: new Location({
      startLine: 1,
      endLine: 1,
      startColumn: 5,
      endColumn: 22,
    }),
    async fix(node: HTMLNode) {
      if (node.value instanceof Element) {
        node.value.children = [new DataNode(ElementType.Text, 'Goodnight')];
      }
      return node;
    },
  });

  const result = await immutableFix(source, report);

  expect(source.node.text).toBe(`<div><p>Hello world</p></div>`);
  expect(result.node.text).toBe('<div><p>Goodnight</p></div>');
});

it('applies fix to CSS without modifying the original', async () => {
  const source = new Source({
    type: SourceType.CSS,
    node: new CSSNode(root),
  });

  const report = new Report({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/html/body',
    // eslint-disable-next-line
    node: new CSSNode((root.first as any).first!),
    location: new Location({
      startLine: 3,
      endLine: 3,
      startColumn: 3,
      endColumn: 13,
    }),
    async fix(node: CSSNode) {
      if (node.value.type === 'decl') {
        node.value.value = 'blue';
      }
      return node;
    },
  });

  const result = await immutableFix(source, report);

  expect(source.node.text).toBe(`
div {
  color: red;
}
`);
  expect(result.node.text).toBe(`
div {
  color: blue;
}
`);
});
