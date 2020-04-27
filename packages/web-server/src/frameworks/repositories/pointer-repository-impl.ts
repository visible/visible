import { CSSPointer, HTMLPointer } from '../../domain/models';
import {
  CSSPointerORM,
  HTMLPointerORM,
  PointerORM,
  ReportORM,
} from '../entities';

export class PointerRepositoryImpl {
  static toDomain(pointer: PointerORM) {
    if (pointer instanceof HTMLPointerORM) {
      return new HTMLPointer({
        id: pointer.id,
        source: pointer.source,
        location: pointer.location,
        screenshot: pointer.screenshot,
        xpath: pointer.xpath,
      });
    }

    if (pointer instanceof CSSPointerORM) {
      return new CSSPointer({
        id: pointer.id,
        source: pointer.source,
        location: pointer.location,
        screenshot: pointer.screenshot,
        xpath: pointer.xpath,
        propertyName: pointer.propertyName,
      });
    }

    throw new Error('unknown pointer type');
  }

  static toCSSPointerORM(pointer: CSSPointer, report: ReportORM) {
    const entity = new CSSPointerORM();
    entity.id = pointer.id;
    entity.location = pointer.location;
    entity.screenshot = pointer.screenshot;
    entity.xpath = pointer.xpath;
    entity.propertyName = pointer.propertyName;
    entity.report = report;
    return entity;
  }

  static toHTMLPointerORM(pointer: HTMLPointer, report: ReportORM) {
    const entity = new HTMLPointerORM();
    entity.id = pointer.id;
    entity.location = pointer.location;
    entity.screenshot = pointer.screenshot;
    entity.xpath = pointer.xpath;
    entity.report = report;
    return entity;
  }
}
