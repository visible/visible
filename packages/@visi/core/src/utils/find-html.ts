import { Node, NodeWithChildren } from 'domhandler';
import { findOne } from 'domutils';

export const findHTML = (nodes: Node[]): NodeWithChildren | null => {
  return findOne(
    (element) => {
      return element.tagName === 'html';
    },
    nodes,
    true,
  );
};
