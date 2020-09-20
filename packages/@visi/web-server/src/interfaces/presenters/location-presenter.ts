import { injectable } from 'inversify';

import { Location } from '../../domain/models';
import { API } from './types';

@injectable()
export class LocationPresenter {
  run(location: Location): API.Location {
    return {
      startLine: location.startLine,
      endLine: location.endLine,
      startColumn: location.startColumn,
      endColumn: location.endColumn,
    };
  }
}
