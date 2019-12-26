import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Diagnostic {
  @PrimaryGeneratedColumn('uuid')
  id: string;
}
