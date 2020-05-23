import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import {
  CSSPointer,
  HTMLPointer,
  Location,
  Pointer,
} from '../../domain/models';
import { ReportORM } from './report';
import { SourceORM } from './source';

/*
 * Basic Single Table Inheritance
 */
@Entity('pointer')
export class PointerORM {
  static fromDomain(pointer: Pointer) {
    if (pointer instanceof HTMLPointer) {
      const entity = new PointerORM();
      entity.id = pointer.id;
      entity.type = 'html';
      entity.xpath = pointer.xpath;
      entity.location = pointer.location;
      entity.screenshot = pointer.screenshot;
      entity.reportId = pointer.reportId;
      entity.sourceId = pointer.source?.id;
      return entity;
    }

    if (pointer instanceof CSSPointer) {
      const entity = new PointerORM();
      entity.id = pointer.id;
      entity.type = 'html';
      entity.xpath = pointer.xpath;
      entity.propertyName = pointer.propertyName;
      entity.location = pointer.location;
      entity.screenshot = pointer.screenshot;
      entity.reportId = pointer.reportId;
      entity.sourceId = pointer.source?.id;
      return entity;
    }

    throw new TypeError(`Unexpected pointer type ${pointer}`);
  }

  toDomain() {
    if (this.type === 'html' && this.xpath) {
      return HTMLPointer.from({
        id: this.id,
        reportId: this.reportId,
        source: this.source?.toDomain(),
        location: this.location,
        screenshot: this.screenshot,
        xpath: this.xpath,
      });
    }

    if (this.type === 'css-property' && this.xpath && this.propertyName) {
      return CSSPointer.from({
        id: this.id,
        reportId: this.reportId,
        source: this.source?.toDomain(),
        location: this.location,
        screenshot: this.screenshot,
        xpath: this.xpath,
        propertyName: this.propertyName,
      });
    }

    throw new TypeError(`Unexpected pointer type ${this.type}`);
  }

  @PrimaryColumn('uuid')
  id!: string;

  @Column('varchar', { length: 32 })
  type!: 'html' | 'css-property';

  @Column('varchar', { length: 255, nullable: true })
  screenshot?: string;

  @Column('json', { nullable: true })
  location?: Location;

  @Column('varchar', { length: 255, nullable: true })
  xpath?: string;

  @Column('varchar', { length: 255, nullable: true })
  propertyName?: string;

  @Column('uuid', { nullable: true })
  sourceId?: string;

  @Column('uuid')
  reportId!: string;

  @ManyToOne(() => SourceORM, { nullable: true })
  readonly source?: SourceORM;

  @ManyToOne(() => ReportORM, { onDelete: 'CASCADE' })
  readonly report?: ReportORM;
}
