import { Column, Entity, PrimaryColumn } from 'typeorm';

import { RuleType } from '../../domain/models';

@Entity('rule')
export class RuleORM {
  @PrimaryColumn('varchar', { length: 255 })
  id: string;

  @Column('varchar', { length: 255 })
  type: RuleType;

  @Column('varchar', { length: 255 })
  description?: string;
}
