import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('source')
export class SourceORM {
  @PrimaryColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('varchar', { length: 255, nullable: true })
  url: string;

  @Column('varchar', { length: 255, nullable: true })
  title: string;
}
