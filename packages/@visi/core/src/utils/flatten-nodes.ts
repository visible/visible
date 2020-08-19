import { Node } from 'domhandler';
import { getChildren, hasChildren } from 'domutils';

const flattenNode = (node: Node): Node[] => {
  if (!hasChildren(node)) return [node];
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return [node, ...getChildren(node)!.flatMap((node) => flattenNode(node))];
};

export const flattenNodes = (nodes: Node[]): Node[] => {
  return nodes.flatMap((node) => flattenNode(node));
};
