import { injectable } from 'inversify';

import {
  CSSPointer,
  HTMLPointer,
  Location,
  Pointer,
  Source,
} from '../../domain/models';
import {
  CSSPointerAPI,
  HTMLPointerAPI,
  LocationAPI,
  PointerAPI,
  SourceAPI,
} from './types';

@injectable()
export class PointerPresenter {
  transformSource(source: Source): SourceAPI {
    return {
      id: source.id,
      content: source.content,
      title: source.title,
      url: source.url,
    };
  }

  transformLocation(location: Location): LocationAPI {
    return {
      startLine: location.startLine,
      startColumn: location.startColumn,
      endLine: location.endLine,
      endColumn: location.endColumn,
    };
  }

  transformHTMLPointer(pointer: HTMLPointer): HTMLPointerAPI {
    return {
      id: pointer.id,
      xpath: pointer.xpath,
      screenshot: pointer.screenshot,
      source: pointer.source && this.transformSource(pointer.source),
      location: pointer.location && this.transformLocation(pointer.location),
    };
  }

  transformCSSPointer(pointer: CSSPointer): CSSPointerAPI {
    return {
      id: pointer.id,
      xpath: pointer.xpath,
      propertyName: pointer.propertyName,
      screenshot: pointer.screenshot,
      source: pointer.source && this.transformSource(pointer.source),
      location: pointer.location && this.transformLocation(pointer.location),
    };
  }

  run(pointer: Pointer): PointerAPI {
    // TODO: Use instanceof instead
    if ('propertyName' in pointer) {
      return this.transformCSSPointer(pointer);
    }

    return this.transformHTMLPointer(pointer);
  }
}
