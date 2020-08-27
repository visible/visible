import {
  CSSNode,
  HTMLNode,
  HTMLRootNode,
  Location,
  Report,
  Source,
} from '../source';
import { findASTByXPath } from './find-ast-by-xpath';

const findHTMLNodeForReport = (node: HTMLRootNode) => (report: Report) => {
  const result = findASTByXPath(node.value, report.target);
  return result && new HTMLNode(result);
};

const findCSSNodeForReport = (node: CSSNode) => (report: Report) => {
  let result: CSSNode | undefined;

  if (node.value.type !== 'root') {
    return;
  }

  node.value.walk((node) => {
    const condition =
      node.source &&
      node.source.start &&
      node.source.end &&
      report.node.location?.equals(
        new Location({
          startLine: node.source.start.line,
          startColumn: node.source.start.column,
          endLine: node.source.end.line,
          endColumn: node.source.end.column,
        }),
      );
    if (condition) {
      result = new CSSNode(node);
    }
  });

  return result;
};

export const immutableFix = async (
  _source: Source,
  report: Report,
): Promise<Source> => {
  const source = _source.clone();

  const target =
    source.node instanceof HTMLRootNode
      ? findHTMLNodeForReport(source.node)(report)
      : source.node instanceof CSSNode
      ? findCSSNodeForReport(source.node)(report)
      : (() => {
          throw new Error(`Illegal type of node ${typeof source.node} given`);
        })();

  if (target == null) {
    throw new Error(`No equivalent node found for report ${report.id}`);
  }

  await report.fix(target);

  return source;
};
