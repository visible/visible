export interface LocationConstructorParams {
  startLine: number;
  endLine: number;
  startColumn: number;
  endColumn: number;
}

const convertIndexToLocation = (
  source: string,
  position: number,
): [number, number] => {
  const lines = source.substr(0, position).split('\n');
  const ancestorLines = lines.slice(0, lines.length - 1);

  const line = lines.length;
  const column = position - ancestorLines.join('\n').length;

  return [line, column];
};

export class Location {
  readonly startLine: number;
  readonly endLine: number;
  readonly startColumn: number;
  readonly endColumn: number;

  static fromIndices(source: string, startIndex: number, endIndex: number) {
    const startsAt = convertIndexToLocation(source, startIndex);
    const endsAt = convertIndexToLocation(source, endIndex);

    return new Location({
      startLine: startsAt[0],
      startColumn: startsAt[1],
      endLine: endsAt[0],
      endColumn: endsAt[1],
    });
  }

  constructor(params: LocationConstructorParams) {
    this.startLine = params.startLine;
    this.endLine = params.endLine;
    this.startColumn = params.startColumn;
    this.endColumn = params.endColumn;
  }
}
