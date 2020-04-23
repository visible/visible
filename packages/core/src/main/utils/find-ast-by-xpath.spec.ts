import html from '../../__fixtures__/html';
import { findASTByXPath } from './find-ast-by-xpath';

describe('findNodeByXPath', () => {
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
