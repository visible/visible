import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('source')
export class SourceORM {
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Column('text')
  content: string;

  @Column('varchar', { length: 255, nullable: true })
  url: string;

  @Column('varchar', { length: 255, nullable: true })
  title: string;
}
