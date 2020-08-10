import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Outcome, Report } from '../../../domain/models';
import { DiagnosisTable } from '../diagnosis';
import { PointerTable } from '../pointer';
import { RuleTable } from '../rule';

@Entity('report')
export class ReportTable {
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

  @ManyToOne(() => DiagnosisTable, { onDelete: 'CASCADE' })
  readonly diagnosis?: DiagnosisTable;

  @ManyToOne(() => RuleTable)
  readonly rule?: RuleTable;

  @OneToMany(() => PointerTable, (pointer) => pointer.report, {
    nullable: true,
  })
  pointers?: PointerTable[];

  static fromDomain(report: Report) {
    const entity = new ReportTable();
    entity.id = report.id;
    entity.outcome = report.outcome;
    entity.target = report.target;
    entity.message = report.message;
    entity.diagnosisId = report.diagnosisId;
    entity.ruleId = report.rule.id;
    entity.pointers = report.pointers?.map((pointer) =>
      PointerTable.fromDomain(pointer),
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
}
