import { Protocol } from 'devtools-protocol/types/protocol';
import { CDPSession } from 'puppeteer';
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

const isSameKind = (a: Protocol.DOM.Node, b: Protocol.DOM.Node) => {
  if (a.nodeType === 1 && b.nodeType === 1) {
    return a.localName === b.localName;
  }

  if (a.nodeType === 3 && b.nodeType === 3) {
    return true;
  }

  return false;
};

const filterSameKind = (topic: Protocol.DOM.Node, nodes: Protocol.DOM.Node[]) =>
  nodes.filter((node) => isSameKind(topic, node));

const testPredicates = (
  predicates: PredicateNode[],
  node: Protocol.DOM.Node,
  parent?: Protocol.DOM.Node,
) => {
  return predicates.every((predicate) => {
    if (
      predicate.type === EQUALITY &&
      predicate.lhs.type === FUNCTION_CALL &&
      predicate.lhs.name === POSITION &&
      predicate.rhs.type === NUMBER &&
      parent &&
      parent.children
    ) {
      const selfIndex = filterSameKind(node, parent.children).findIndex(
        (child) => child.nodeId === node.nodeId,
      );
      return selfIndex === predicate.rhs.number - 1;
    }

    // eslint-disable-next-line
    console.warn(`Predicate ${predicate.type} is not implemented yet`);
    return false;
  });
};

const testNodeName = (
  node: Protocol.DOM.Node,
  name: string,
  parent?: Protocol.DOM.Node,
  predicates: PredicateNode[] = [],
) => {
  if (node.localName === name && testPredicates(predicates, node, parent)) {
    return true;
  }

  return false;
};

const testNodeType = (
  node: Protocol.DOM.Node,
  type: string,
  parent?: Protocol.DOM.Node,
  predicates: PredicateNode[] = [],
) => {
  if (
    type === 'text' &&
    node.nodeName === '#text' &&
    testPredicates(predicates, node, parent)
  ) {
    return true;
  }
};

const findNode = (
  node: Protocol.DOM.Node,
  [step, ...restSteps]: StepNode[],
): Protocol.DOM.Node | undefined => {
  if (step == null) return node;
  if (node.children == null) throw new Error('node has no children');

  const { test } = step;

  const match = node.children.find((child) => {
    switch (test.type) {
      case NODE_NAME_TEST:
        return testNodeName(child, test.name, node, step.predicates);
      case NODE_TYPE_TEST:
        return testNodeType(child, test.name, node, step.predicates);
      default:
        // eslint-disable-next-line
        console.warn(`Test type ${test.type} is not implemented yet`);
        return false;
    }
  });
  if (!match) return;

  return findNode(match, restSteps);
};

export const findNodeByXPath = async (client: CDPSession, xpath: string) => {
  const { root } = await client.send('DOM.getDocument', { depth: -1 });

  const rootXPath = new XPathAnalyzer(xpath).parse();
  if (rootXPath.type !== ABSOLUTE_LOCATION_PATH) {
    throw new Error('Given Xpath must start with /, got' + xpath);
  }

  return findNode(root, rootXPath.steps);
};
