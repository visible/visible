import { Node as DomNode } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { parseDOM } from 'htmlparser2';
import { Node as PostcssNode } from 'postcss';

import { Location } from './location';

export enum NodeType {
  HTML = 'text/html',
  CSS = 'text/css',
}

export interface BaseNode<T> {
  readonly type: NodeType;
  readonly value: T;
  readonly text: string;
  readonly location?: Location;
  clone(): BaseNode<T>;
}

export class HTMLNode implements BaseNode<DomNode> {
  readonly type = NodeType.HTML;
  readonly value: DomNode;

  constructor(value: DomNode) {
    this.value = value;
  }

  get text(): string {
    return getOuterHTML(this.value);
  }

  get location(): Location | undefined {
    if (this.value.startIndex && this.value.endIndex) {
      return Location.fromIndices(
        this.text,
        this.value.startIndex,
        this.value.endIndex,
      );
    }
  }

  clone(): HTMLNode {
    const [newNode] = parseDOM(this.text);
    // Pretend as if it was in original HTML
    newNode.startIndex = this.value.startIndex;
    newNode.endIndex = this.value.endIndex;
    return new HTMLNode(newNode);
  }
}

export class HTMLRootNode implements BaseNode<DomNode[]> {
  readonly type = NodeType.HTML;
  readonly value: DomNode[];

  constructor(value: DomNode[]) {
    this.value = value;
  }

  get text(): string {
    return getOuterHTML(this.value);
  }

  get location(): Location | undefined {
    return Location.fromIndices(this.text, 0, 0);
  }

  clone(): HTMLRootNode {
    const newNode = parseDOM(this.text, {
      withEndIndices: true,
      withStartIndices: true,
    });
    return new HTMLRootNode(newNode);
  }
}

export class CSSNode implements BaseNode<PostcssNode> {
  readonly type = NodeType.CSS;
  readonly value: PostcssNode;

  constructor(value: PostcssNode) {
    this.value = value;
  }

  get text(): string {
    return this.value.toString();
  }

  get location(): Location | undefined {
    if (this.value.source && this.value.source.start && this.value.source.end) {
      return new Location({
        startLine: this.value.source.start.line,
        startColumn: this.value.source.start.column,
        endLine: this.value.source.end.line,
        endColumn: this.value.source.end.column,
      });
    }
  }

  clone(): CSSNode {
    const newNode = this.value.clone();
    return new CSSNode(newNode);
  }
}

export type Node = HTMLNode | HTMLRootNode | CSSNode;
