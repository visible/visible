import { IsInt, IsPositive } from 'class-validator';

import { validateOrRejectSync } from '../../utils/validate-or-reject-sync';

export interface LocationConstructorParams {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export class Location {
  @IsPositive()
  @IsInt()
  readonly startLine: number;

  @IsPositive()
  @IsInt()
  readonly startColumn: number;

  @IsPositive()
  @IsInt()
  readonly endLine: number;

  @IsPositive()
  @IsInt()
  readonly endColumn: number;

  constructor(params: LocationConstructorParams) {
    this.startLine = params.startLine;
    this.startColumn = params.startColumn;
    this.endLine = params.endLine;
    this.endColumn = params.endColumn;
    validateOrRejectSync(this);
  }
}
