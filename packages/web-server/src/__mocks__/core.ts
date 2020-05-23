import { Subject } from 'rxjs';

import letterhead from '../__fixtures__/letterhead.json';

export const diagnosis$ = new Subject();

export class Visible {
  static init = jest.fn(() => new Visible());
  diagnosis$ = diagnosis$;

  fetchLetterhead = jest.fn().mockResolvedValue(letterhead);
  open = jest.fn();
  close = jest.fn();
  getSources = jest.fn(() => new Map());
  diagnose = jest.fn(() => this.diagnosis$);
}
