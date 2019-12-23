import { ElementHandle } from 'puppeteer';

export const createXPath = (element: ElementHandle) =>
  element.evaluate(
    /* istanbul ignore next */
    element => {
      if (!element.parentNode) return '/';

      const _getSelfXPath = (node: Node) => {
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

      const _createXPath = (node: Node, decendantPaths: string): string => {
        if (!node.parentNode) return '/' + decendantPaths;

        return _createXPath(
          node.parentNode,
          [_getSelfXPath(node), decendantPaths].join('/'),
        );
      };

      return _createXPath(element.parentNode, _getSelfXPath(element));
    },
  );
