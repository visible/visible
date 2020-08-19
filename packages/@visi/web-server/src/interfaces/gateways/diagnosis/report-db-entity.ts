import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Outcome, Report } from '../../../domain/models';
import { RuleDBEntity } from '../rule';
import { SourceDBEntity } from './source-db-entity';

@Entity('report')
export class ReportDBEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  outcome!: Outcome;

  @Column('varchar', { length: 255, nullable: true })
  target?: string;

  @Column('varchar', { length: 255, nullable: true })
  message?: string;

  @Column('uuid')
  sourceId!: string;

  @Column('uuid')
  ruleId!: string;

  @Column('text')
  diffHunk?: string;

  @ManyToOne(() => SourceDBEntity, { onDelete: 'CASCADE' })
  readonly source?: SourceDBEntity;

  @ManyToOne(() => RuleDBEntity)
  readonly rule?: RuleDBEntity;

  static fromDomain(report: Report): ReportDBEntity {
    const entity = new ReportDBEntity();
    entity.id = report.id;
    entity.outcome = report.outcome;
    entity.target = report.target;
    entity.message = report.message;
    entity.sourceId = report.sourceId;
    entity.ruleId = report.ruleId;
    entity.diffHunk = report.diffHunk;
    return entity;
  }

  toDomain(): Report {
    return Report.from({
      id: this.id,
      outcome: this.outcome,
      ruleId: this.ruleId,
      target: this.target,
      message: this.message,
      sourceId: this.sourceId,
      diffHunk: this.diffHunk,
    });
  }
}
