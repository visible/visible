import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { Outcome } from '../../domain/models';
import { DiagnosisORM } from './diagnosis';
import { PointerORM } from './pointer';
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
    () => PointerORM,
    pointer => pointer.report,
    { nullable: true },
  )
  pointers?: PointerORM[];
}
