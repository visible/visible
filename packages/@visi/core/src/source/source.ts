import { Node as HTMLNode } from 'domhandler';
import { getOuterHTML } from 'domutils';
import { Root as CSSRoot } from 'postcss';

import { Report } from './report';

export enum SourceType {
  HTML = 'html',
  CSS = 'css',
}

export interface HTMLSourceConstructorParams {
  id: string;
  url: string;
  content: HTMLNode[];
  reports?: Report[];
}

export class HTMLSource {
  readonly type = SourceType.HTML;

  readonly id: string;
  readonly content: HTMLNode[];
  readonly url?: string;
  reports: Report[]; // todo: mark as readonly

  constructor(params: HTMLSourceConstructorParams) {
    this.id = params.id;
    this.content = params.content;
    this.url = params.url;
    this.reports = params.reports ?? [];
  }

  get text() {
    return getOuterHTML(this.content);
  }
}

export interface CSSSourceConstructorParams {
  id: string;
  url: string;
  content: CSSRoot;
  reports?: Report[];
}

export class CSSSource {
  readonly type = SourceType.CSS;

  readonly id: string;
  readonly content: CSSRoot;
  readonly url?: string;
  reports: Report[]; // todo: mark as readonly

  constructor(params: CSSSourceConstructorParams) {
    this.id = params.id;
    this.content = params.content;
    this.url = params.url;
    this.reports = params.reports ?? [];
  }

  get text() {
    return this.content.toString();
  }
}

export type Source = HTMLSource | CSSSource;
