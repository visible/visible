import { Column, Entity } from 'typeorm';

import { PointerORM } from './pointer';

@Entity('html-pointer')
export class HTMLPointerORM extends PointerORM {
  @Column('varchar', { length: 255 })
  xpath: string;

  @Column('varchar', { length: 255 })
  propertyName: string;
}
