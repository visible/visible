import { Source } from '../main';

export interface Location {
  readonly startLine: number;
  readonly startColumn: number;
  readonly endLine: number;
  readonly endColumn: number;
}

export interface BasePointer {
  readonly sourceId?: Source['id'];
  readonly location?: Location;
  readonly screenshot?: string;
}

export interface HTMLPointer extends BasePointer {
  readonly type: 'html';
  readonly xpath: string;
}

export interface CSSPropertyPointer extends BasePointer {
  readonly type: 'css-property';
  readonly xpath: string;
  readonly propertyName: string;
}

export type Pointer = HTMLPointer | CSSPropertyPointer;
