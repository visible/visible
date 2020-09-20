const isSameKind = (a: Node, b: Node) => {
  if (a instanceof Element && b instanceof Element) {
    return a.tagName === b.tagName;
  }

  if (a instanceof Text && b instanceof Text) {
    return true;
  }

  return false;
};

const filterSameKind = (topic: Node, nodes: Node[]) =>
  nodes.filter((node) => isSameKind(topic, node));

const getSelfXPath = (node: Node) => {
  if (node.parentNode == null || node.parentNode.childNodes == null) {
    throw new Error('Provide parent node');
  }

  const childNodes = Array.from(node.parentNode.childNodes);
  const sameKindNodes = filterSameKind(node, childNodes);

  const name = node instanceof Element ? node.tagName.toLowerCase() : 'text()';
  let predicate = '';

  if (node.parentNode && sameKindNodes.length >= 2) {
    const index = sameKindNodes.findIndex((child) => child.isSameNode(node));
    predicate = `[position()=${index + 1}]`;
  }

  return name + predicate;
};

export const createXPath = (node: Node, descendants?: string): string => {
  if (!node.parentNode) return '/' + descendants;
  const selfXPath = getSelfXPath(node);

  return createXPath(
    node.parentNode,
    descendants ? [selfXPath, descendants].join('/') : selfXPath,
  );
};
