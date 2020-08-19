import { parseDOM } from 'htmlparser2';

import { flattenNodes } from './flatten-nodes';

const dom = parseDOM(`<div><p>Hello world</p></div>`);

it('flattens node', () => {
  const nodes = flattenNodes(dom);
  expect(nodes.length).toBe(3);
});
