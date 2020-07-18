export interface LocationConstructorParams {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

export class Location {
  readonly startLine: number;
  readonly endLine: number;
  readonly startColumn: number;
  readonly endColumn: number;

  constructor(params: LocationConstructorParams) {
    this.startLine = params.startLine;
    this.endLine = params.endLine;
    this.startColumn = params.startColumn;
    this.endColumn = params.endColumn;
  }
}
