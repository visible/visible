import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';

import { Source } from '../../domain/models';
import { PointerORM } from './pointer';

@Entity('source')
export class SourceORM {
  static fromDomain(source: Source) {
    const entity = new SourceORM();
    entity.id = source.id;
    entity.content = source.content;
    entity.url = source.url;
    entity.title = source.title;
    entity.pointerId = source.pointerId;
    return entity;
  }

  toDomain() {
    return Source.from({
      id: this.id,
      content: this.content,
      url: this.url,
      title: this.title,
      pointerId: this.pointerId,
    });
  }

  @PrimaryColumn('uuid')
  id!: string;

  @Column('text')
  content!: string;

  @Column('varchar', { length: 255, nullable: true })
  url?: string;

  @Column('varchar', { length: 255, nullable: true })
  title?: string;

  @Column('uuid')
  pointerId!: string;

  @OneToOne(() => PointerORM, (report) => report.source, {
    onDelete: 'CASCADE',
  })
  readonly pointer?: PointerORM;
}
