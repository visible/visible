const getSelfXPath = (node: Node) => {
  const suffix =
    node.parentNode && node.parentNode.children.length >= 2
      ? `[@position()=${Array.from(node.parentNode.children).findIndex(
          child => child === node,
        ) + 1}]`
      : '';

  const tagName =
    node instanceof Element ? node.tagName.toLowerCase() : 'text()';

  return tagName + suffix;
};

export const createXPath = (node: Node, decendantPaths = '/'): string => {
  if (!node.parentNode) return '/' + decendantPaths;

  return createXPath(
    node.parentNode,
    [getSelfXPath(node), decendantPaths].join('/'),
  );
};
