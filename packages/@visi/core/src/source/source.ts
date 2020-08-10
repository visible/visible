import { Node as HTMLNode } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { immerable, produce } from 'immer';
import { Root as CSSRoot } from 'postcss';

import { CSSReport, HTMLReport, Report } from './report';

export enum SourceType {
  HTML = 'html',
  CSS = 'css',
}

export interface SourceConstructorParams {
  id: string;
  reports?: Report[];
  url?: string;
}

export abstract class BaseSource {
  readonly [immerable] = true;
  abstract readonly text: string;
  abstract readonly reports: readonly Report[];

  constructor(readonly id: string, readonly url?: string) {}

  addReport(report: Report) {
    return produce(this, (draft) => {
      draft.reports.push(report);
    });
  }

  async applyFixes() {
    for (const report of this.reports) {
      await report.fix?.();
    }
  }
}

export interface HTMLSourceConstructorParams extends SourceConstructorParams {
  content: HTMLNode[];
  reports?: HTMLReport[];
}

export class HTMLSource extends BaseSource {
  readonly type = SourceType.HTML;
  readonly content: HTMLNode[];
  readonly reports: readonly HTMLReport[];

  constructor(params: HTMLSourceConstructorParams) {
    super(params.id, params.url);
    this.content = params.content;
    this.reports = params.reports ?? [];
  }

  /* istanbul ignore next */
  get text() {
    return getOuterHTML(this.content);
  }
}

export interface CSSSourceConstructorParams extends SourceConstructorParams {
  content: CSSRoot;
  reports?: CSSReport[];
}

export class CSSSource extends BaseSource {
  readonly type = SourceType.CSS;
  readonly content: CSSRoot;
  readonly reports: readonly CSSReport[];

  constructor(params: CSSSourceConstructorParams) {
    super(params.id, params.url);
    this.content = params.content;
    this.reports = params.reports ?? [];
  }

  /* istanbul ignore next */
  get text() {
    return this.content.toString();
  }
}

export type Source = HTMLSource | CSSSource;
