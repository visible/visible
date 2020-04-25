import { CSSPointer, HTMLPointer, Pointer } from '../../domain/models';
import { HTMLPointerORM, ReportORM } from '../entities';

export class PointerRepositoryImpl {
  static toORM(pointer: Pointer, report: ReportORM) {
    if (pointer instanceof HTMLPointer) {
      const entity = new HTMLPointerORM();
      entity.id = pointer.id;
      entity.location = pointer.location;
      entity.screenshot = pointer.screenshot;
      entity.xpath = pointer.xpath;
      entity.report = report;
      return entity;
    }

    if (pointer instanceof CSSPointer) {
      const entity = new HTMLPointerORM();
      entity.id = pointer.id;
      entity.location = pointer.location;
      entity.screenshot = pointer.screenshot;
      entity.xpath = pointer.xpath;
      entity.propertyName = pointer.propertyName;
      entity.report = report;
      return entity;
    }

    throw new Error('Unknown pointer type');
  }
}
