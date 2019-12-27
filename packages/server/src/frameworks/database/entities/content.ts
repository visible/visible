import { Entity, Column } from 'typeorm';

@Entity()
export class Content {
  @Column('varchar')
  html: string;

  @Column('varchar')
  xpath: string;

  @Column('varchar')
  css: string;
}
