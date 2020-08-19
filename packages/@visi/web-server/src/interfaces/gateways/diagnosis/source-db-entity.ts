import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Source } from '../../../domain/models';
import { DiagnosisDBEntity } from './diagnosis-db-entity';
import { ReportDBEntity } from './report-db-entity';

@Entity('source')
export class SourceDBEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @Column('varchar', { length: 255, nullable: true })
  url?: string;

  @Column('uuid')
  diagnosisId!: string;

  @ManyToOne(() => DiagnosisDBEntity, (diagnosis) => diagnosis.sources)
  readonly diagnosis?: DiagnosisDBEntity;

  @OneToMany(() => ReportDBEntity, (report) => report.source)
  readonly reports?: ReportDBEntity[];

  static fromDomain(source: Source): SourceDBEntity {
    const entity = new SourceDBEntity();
    entity.id = source.id;
    entity.content = source.content;
    entity.url = source.url;
    entity.diagnosisId = source.diagnosisId;
    return entity;
  }

  toDomain(): Source {
    if (this.reports == null) {
      throw new TypeError(
        'No value specified for reports property. You may have forgot JOIN?',
      );
    }

    return Source.from({
      id: this.id,
      content: this.content,
      url: this.url,
      diagnosisId: this.diagnosisId,
      reports: this.reports.map((report) => report.toDomain()),
    });
  }
}
