import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Outcome, Report } from '../../domain/models';
import { DiagnosisORM } from './diagnosis';
import { PointerORM } from './pointer';
import { RuleORM } from './rule';

@Entity('report')
export class ReportORM {
  static fromDomain(report: Report) {
    const entity = new ReportORM();
    entity.id = report.id;
    entity.outcome = report.outcome;
    entity.target = report.target;
    entity.message = report.message;
    entity.diagnosisId = report.diagnosisId;
    entity.ruleId = report.rule.id;
    entity.pointers = report.pointers?.map((pointer) =>
      PointerORM.fromDomain(pointer),
    );
    return entity;
  }

  toDomain() {
    if (this.rule == null) {
      throw new TypeError(
        'No value specified for rule property. You may have forgot to JOIN',
      );
    }

    return Report.from({
      id: this.id,
      outcome: this.outcome,
      target: this.target,
      message: this.message,
      diagnosisId: this.diagnosisId,
      rule: this.rule.toDomain(),
      pointers: this.pointers?.map((pointer) => pointer.toDomain()),
    });
  }

  @PrimaryColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  outcome!: Outcome;

  @Column('varchar', { length: 255, nullable: true })
  target?: string;

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @Column('uuid')
  diagnosisId!: string;

  @Column('uuid')
  ruleId!: string;

  @ManyToOne(() => DiagnosisORM, { onDelete: 'CASCADE' })
  readonly diagnosis?: DiagnosisORM;

  @ManyToOne(() => RuleORM)
  readonly rule?: RuleORM;

  @OneToMany(() => PointerORM, (pointer) => pointer.report, { nullable: true })
  pointers?: PointerORM[];
}
