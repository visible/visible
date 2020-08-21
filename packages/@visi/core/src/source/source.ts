import { Node as HTMLNode } from 'domhandler';
import { getOuterHTML, replaceElement } from 'domutils';
import { parseDOM } from 'htmlparser2';
import { castDraft, immerable, produce } from 'immer';
import { Node as CSSNode, Root as CSSRoot } from 'postcss';
import * as uuid from 'uuid';

import { findASTByXPath } from '../utils';
import { Location } from './location';
import { BaseReport, CSSReport, HTMLReport } from './report';

export enum SourceType {
  HTML = 'html',
  CSS = 'css',
}

export interface SourceConstructorParams<T> {
  url?: string;
  reports?: readonly BaseReport<T>[];
}

export interface BaseSource<T, U> {
  readonly type: SourceType;
  readonly id: string;
  readonly url?: string;
  readonly content: T;
  readonly text: string;
  readonly reports: readonly BaseReport<U>[];
  clone(): this;
  apply(patch: BaseReport<U>): Promise<this>;
  addReport(report: BaseReport<U>): this;
  applyFixes(): Promise<this>;
}

export interface HTMLSourceConstructorParams
  extends SourceConstructorParams<HTMLNode> {
  content: HTMLNode[];
  reports?: readonly HTMLReport[];
}

export class HTMLSource implements BaseSource<HTMLNode[], HTMLNode> {
  readonly id: string;
  readonly reports: readonly HTMLReport[];
  readonly url?: string;
  readonly type = SourceType.HTML;
  readonly content: HTMLNode[];

  private readonly [immerable] = true;

  constructor(params: HTMLSourceConstructorParams) {
    this.id = uuid.v4();
    this.reports = params.reports ?? [];
    this.url = params.url;
    this.content = params.content;
  }

  /* istanbul ignore next */
  get text(): string {
    return getOuterHTML(this.content);
  }

  clone(): this {
    return produce(this, (draft) => {
      draft.content = parseDOM(this.text, {
        withEndIndices: true,
        withStartIndices: true,
      });
    });
  }

  async apply(report: HTMLReport): Promise<this> {
    if (report.location == null) {
      throw new Error(`No location given for report ${report.id}`);
    }

    const target = findASTByXPath(this.content, report.target);
    if (target == null) {
      throw new Error(`No matching node found for ${report.location}`);
    }

    const patch = await report.fix();
    if (patch == null) {
      return this;
    }

    replaceElement(target, patch);
    return this;
  }

  addReport(report: HTMLReport): this {
    return produce(this, (draft) => {
      draft.reports.push(castDraft(report));
    });
  }

  async applyFixes(): Promise<this> {
    for (const report of this.reports) {
      await report.fix();
    }

    return this;
  }
}

export interface CSSSourceConstructorParams
  extends SourceConstructorParams<CSSNode> {
  content: CSSRoot;
  reports?: readonly CSSReport[];
}

export class CSSSource implements BaseSource<CSSRoot, CSSNode> {
  readonly id: string;
  readonly url?: string;
  readonly reports: readonly CSSReport[];
  readonly type = SourceType.CSS;
  readonly content: CSSRoot;

  private readonly [immerable] = true;

  constructor(params: CSSSourceConstructorParams) {
    this.id = uuid.v4();
    this.url = params.url;
    this.reports = params.reports ?? [];
    this.content = params.content;
  }

  /* istanbul ignore next */
  get text(): string {
    return this.content.toString();
  }

  clone(): this {
    return produce(this, (draft) => {
      draft.content = this.content.clone();
    });
  }

  async apply(report: CSSReport): Promise<this> {
    if (report.location == null) throw 'no loc';
    const target = this.findAt(report.location);
    if (target == null) throw 'no target';
    const patch = await report.fix();
    if (patch == null) throw 'no patch';
    target.replaceWith(patch.clone());
    return this;
  }

  addReport(report: CSSReport): this {
    return produce(this, (draft) => {
      draft.reports.push(castDraft(report));
    });
  }

  async applyFixes(): Promise<this> {
    for (const report of this.reports) {
      await report.fix();
    }

    return this;
  }

  private findAt(location: Location): CSSNode | undefined {
    let result: CSSNode | undefined;

    this.content.walk((node) => {
      const condition =
        node.source &&
        node.source.start &&
        node.source.end &&
        location.equals(
          new Location({
            startLine: node.source.start.line,
            startColumn: node.source.start.column,
            endLine: node.source.end.line,
            endColumn: node.source.end.column,
          }),
        );
      if (condition) {
        result = node;
      }
    });

    return result;
  }
}

export type Source = HTMLSource | CSSSource;
