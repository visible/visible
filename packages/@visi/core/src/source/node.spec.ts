import dom from '../__fixture__/dom';
import root from '../__fixture__/root';
import { CSSNode, HTMLNode, NodeType } from './node';

describe('HTML', () => {
  it('constructs html node', () => {
    const node = new HTMLNode(dom[0]);
    expect(node.type).toBe(NodeType.HTML);
    expect(node.value).toBe(dom[0]);
  });

  it('clones existing node', () => {
    const oldNode = new HTMLNode(dom[0]);
    const newNode = oldNode.clone();
    expect(oldNode.text).toBe(newNode.text);
    expect(oldNode.value).not.toBe(newNode.value);
    console.log(oldNode.value.startIndex, oldNode.value.endIndex);
    console.log(newNode.value.startIndex, newNode.value.endIndex);
    expect(oldNode.value.startIndex).toBe(newNode.value.startIndex);
    expect(oldNode.value.endIndex).toBe(newNode.value.endIndex);
  });
});

describe('CSS', () => {
  it('constructs css node', () => {
    const node = new CSSNode(root);
    expect(node.type).toBe(NodeType.CSS);
    expect(node.value).toBe(root);
  });

  it('clones css node', () => {
    const oldNode = new CSSNode(root);
    const newNode = oldNode.clone();
    expect(oldNode.text).toBe(newNode.text);
    expect(oldNode.value).not.toBe(newNode.value);
  });
});
