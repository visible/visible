import { Column, Entity, Index, OneToMany, PrimaryColumn } from 'typeorm';

import { Diagnosis, Status } from '../../../domain/models';
import { SourceDBEntity } from './source-db-entity';

@Entity('diagnosis')
export class DiagnosisDBEntity {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('varchar', { length: 255 })
  status!: Status;

  @Column('text', { nullable: true })
  screenshot?: string;

  @Index()
  @Column('text')
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

  @Column('int', { default: 0 })
  waitingCountAtCreation!: number;

  @Column('int', { default: 0 })
  completeCountAtCreation!: number;

  @OneToMany(() => SourceDBEntity, (source) => source.diagnosis)
  readonly sources?: SourceDBEntity[];

  static fromDomain(diagnosis: Diagnosis): DiagnosisDBEntity {
    const entity = new DiagnosisDBEntity();
    entity.id = diagnosis.id;
    entity.url = diagnosis.url;
    entity.status = diagnosis.status;
    entity.screenshot = diagnosis.screenshot;
    entity.doneCount = diagnosis.doneCount;
    entity.totalCount = diagnosis.totalCount;
    entity.createdAt = diagnosis.createdAt;
    entity.updatedAt = diagnosis.updatedAt;
    entity.waitingCountAtCreation = diagnosis.waitingCountAtCreation;
    entity.completeCountAtCreation = diagnosis.completeCountAtCreation;
    return entity;
  }

  toDomain(): Diagnosis {
    if (this.sources == null) {
      throw new TypeError(
        'No value specified for sources property. You may have forgot JOIN?',
      );
    }

    return Diagnosis.from({
      id: this.id,
      status: this.status,
      screenshot: this.screenshot,
      url: this.url,
      doneCount: this.doneCount,
      totalCount: this.totalCount,
      sources: this.sources.map((sources) => sources.toDomain()),
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      waitingCountAtCreation: this.waitingCountAtCreation,
      completeCountAtCreation: this.completeCountAtCreation,
    });
  }
}
