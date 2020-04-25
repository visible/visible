export class Location {
  constructor(
    readonly startLine: number,
    readonly startColumn: number,
    readonly endLine: number,
    readonly endColumn: number,
  ) {}
}
