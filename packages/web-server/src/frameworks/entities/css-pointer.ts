import { Column, Entity } from 'typeorm';

import { PointerORM } from './pointer';

@Entity('css-pointer')
export class CSSPointerORM extends PointerORM {
  @Column('varchar', { length: 255 })
  xpath: string;

  @Column('varchar', { length: 255 })
  propertyName: string;
}
