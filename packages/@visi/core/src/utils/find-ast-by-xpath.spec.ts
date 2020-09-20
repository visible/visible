import { parseDOM } from 'htmlparser2';

import { findASTByXPath } from './find-ast-by-xpath';

const html = parseDOM(
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <p>hello world</p>
</body>
</html>`,
  { withEndIndices: true, withStartIndices: true },
)[2];

describe('findNodeByXPath', () => {
  it('finds root', () => {
    const node = findASTByXPath(html, '/html');
    expect(node?.startIndex).toBe(16);
  });

  it('finds an element', () => {
    const node = findASTByXPath(html, '/html/body/p');
    expect(node?.startIndex).toBe(181);
  });

  it('finds a text node', () => {
    const node = findASTByXPath(html, '/html/body/p/text()');
    expect(node?.startIndex).toBe(184);
  });

  it('finds a node with [position] predicate', () => {
    const node = findASTByXPath(html, '/html/head/meta[position()=1]');
    expect(node?.startIndex).toBe(42);
  });
});
