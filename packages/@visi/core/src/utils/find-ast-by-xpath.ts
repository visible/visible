import { Element, Node } from 'domhandler';
import { find } from 'domutils';
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

const testNode = ([head, ...tail]: StepNode[]) => (
  node: Node | null,
): boolean => {
  if (head == null || node == null) {
    return true;
  }

  if (
    head.test.type === NODE_NAME_TEST &&
    testNodeName(node, head.test.name, head.predicates)
  ) {
    return testNode(tail)(node.parent);
  }

  if (
    head.test.type === NODE_TYPE_TEST &&
    testNodeType(node, head.test.name, head.predicates)
  ) {
    return testNode(tail)(node.parent);
  }

  return false;
};

export const findASTByXPath = (
  nodes: Node | Node[],
  xpathStr: string,
): Node | undefined => {
  const root = Array.isArray(nodes) ? nodes : [nodes];
  const xpath = new XPathAnalyzer(xpathStr).parse();

  if (xpath.type !== ABSOLUTE_LOCATION_PATH) {
    throw new Error(`Expected absolute xpath, but got ${xpathStr}`);
  }

  const steps = xpath.steps.reverse();
  return find(testNode(steps), root, true, Number.POSITIVE_INFINITY)?.[0];
};
