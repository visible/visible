import { Element, Node } from 'domhandler';
import XPathAnalyzer, {
  ABSOLUTE_LOCATION_PATH,
  EQUALITY,
  FUNCTION_CALL,
  NODE_NAME_TEST,
  NODE_TYPE_TEST,
  NUMBER,
  POSITION,
  PredicateNode,
  StepNode,
} from 'xpath-analyzer';

import { findHTML } from './find-html';

const isSameKind = (a: Node, b: Node) => {
  if (a instanceof Element && b instanceof Element) {
    return a.tagName === b.tagName;
  }

  if (!(a instanceof Element) && !(b instanceof Element)) {
    return true;
  }

  return false;
};

const filterSameKind = (topic: Node, nodes: Node[]) =>
  nodes.filter((node) => isSameKind(topic, node));

const testPredicates = (predicates: PredicateNode[], node: Node) =>
  predicates.every((predicate) => {
    if (
      predicate.type === EQUALITY &&
      predicate.lhs.type === FUNCTION_CALL &&
      predicate.lhs.name === POSITION &&
      predicate.rhs.type === NUMBER &&
      node.parent
    ) {
      const selfIndex = filterSameKind(node, node.parent.childNodes).findIndex(
        (child) => child === node,
      );

      return selfIndex === predicate.rhs.number - 1;
    }

    // eslint-disable-next-line
    console.warn(`Predicate ${predicate.type} is not implemented yet`);
    return false;
  });

const testNodeType = (
  node: Node,
  name: string,
  predicates: PredicateNode[] = [],
) => {
  // node.nodeType is number for some reason...
  if (
    name === 'text' &&
    !(node instanceof Element) &&
    testPredicates(predicates, node)
  ) {
    return true;
  }

  return false;
};

const testNodeName = (
  node: Node,
  name: string,
  predicates: PredicateNode[] = [],
) => {
  if (
    node instanceof Element &&
    node.tagName.toLowerCase() === name &&
    testPredicates(predicates, node)
  ) {
    return true;
  }

  return false;
};

const findNode = (
  node: Node,
  [step, ...restSteps]: StepNode[],
): Node | undefined => {
  if (step == null) return node;

  if (!(node instanceof Element)) {
    throw new Error('node must be an element');
  }

  const { test } = step;

  const match = node.children.find((child) => {
    switch (test.type) {
      case NODE_NAME_TEST:
        return testNodeName(child, test.name, step.predicates);
      case NODE_TYPE_TEST:
        return testNodeType(child, test.name, step.predicates);
      default:
        // eslint-disable-next-line
        console.warn(`Test type ${test.type} is not implemented yet`);
        return false;
    }
  });
  if (match == null) return;

  return findNode(match, restSteps);
};

export const findASTByXPath = (
  _root: Node | Node[],
  xpath: string,
): Node | undefined => {
  const root = Array.isArray(_root) ? findHTML(_root) : _root;

  if (root == null) {
    throw new Error(`No HTML tag found in the given nodes`);
  }

  const rootXPath = new XPathAnalyzer(xpath).parse();
  if (rootXPath.type !== ABSOLUTE_LOCATION_PATH) {
    throw new Error('Given Xpath must start with /, got' + xpath);
  }

  // Drop /html because we know we have
  const [, ...steps] = rootXPath.steps;
  const node = findNode(root, steps);

  return node;
};
