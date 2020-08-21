import { Node } from 'domhandler';
import { findOne } from 'domutils';

export const findHTML = (nodes: Node[]): Node | null => {
  return findOne(
    (element) => {
      return element.tagName === 'html';
    },
    nodes,
    true,
  );
};
