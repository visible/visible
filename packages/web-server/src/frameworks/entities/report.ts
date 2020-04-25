import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Outcome } from '../../domain/models';
import { CSSPointerORM } from './css-pointer';
import { DiagnosisORM } from './diagnosis';
import { HTMLPointerORM } from './html-pointer';
import { RuleORM } from './rule';

@Entity('report')
export class ReportORM {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', { length: 255 })
  outcome: Outcome;

  @ManyToOne(() => RuleORM, { cascade: true })
  @JoinColumn()
  rule: RuleORM;

  @Column('varchar', { length: 255, nullable: true })
  target?: string;

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @ManyToOne(() => DiagnosisORM, { cascade: true })
  @JoinColumn()
  diagnosis: DiagnosisORM;

  @OneToMany(
    () => HTMLPointerORM,
    pointer => pointer.report,
    { nullable: true },
  )
  htmlPointers?: HTMLPointerORM[];

  @OneToMany(
    () => CSSPointerORM,
    pointer => pointer.report,
    { nullable: true },
  )
  cssPointers?: CSSPointerORM[];
}
