import { IsInt, IsPositive } from 'class-validator';

import { Model } from './model';

export class Location extends Model {
  @IsPositive()
  @IsInt()
  readonly startLine!: number;

  @IsPositive()
  @IsInt()
  readonly startColumn!: number;

  @IsPositive()
  @IsInt()
  readonly endLine!: number;

  @IsPositive()
  @IsInt()
  readonly endColumn!: number;
}
