import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { Diagnosis, Status } from '../../domain/models';
import { ReportORM } from './report';

@Entity('diagnosis')
export class DiagnosisORM {
  static fromDomain(diagnosis: Diagnosis) {
    const entity = new DiagnosisORM();
    entity.id = diagnosis.id;
    entity.url = diagnosis.url;
    entity.status = diagnosis.status;
    entity.screenshot = diagnosis.screenshot;
    entity.doneCount = diagnosis.doneCount;
    entity.totalCount = diagnosis.totalCount;
    entity.createdAt = diagnosis.createdAt;
    entity.updatedAt = diagnosis.updatedAt;
    return entity;
  }

  toDomain() {
    if (this.reports == null) {
      throw new Error(
        'No value specified for reports property. You may have forgot JOIN?',
      );
    }

    return Diagnosis.from({
      id: this.id,
      status: this.status,
      screenshot: this.screenshot,
      url: this.url,
      doneCount: this.doneCount,
      totalCount: this.totalCount,
      reports: this.reports.map((report) => report.toDomain()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    });
  }

  @PrimaryColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  status!: Status;

  @Column('varchar', { length: 255 })
  screenshot!: string;

  @Index()
  @Column('varchar', { length: 255 })
  url!: string;

  @Column('int')
  doneCount!: number;

  @Column('int')
  totalCount!: number;

  @Index()
  @Column('timestamp')
  createdAt!: Date;

  @Index()
  @Column('timestamp')
  updatedAt!: Date;

  @OneToMany(() => ReportORM, (report) => report.diagnosis)
  readonly reports?: ReportORM[];
}
