import { validate, ValidationError } from 'class-validator';

import { Location } from '../location';

describe('CSSPointer', () => {
  it('accepts valid entity', async () => {
    const error = await validate(
      Location.from({
        startLine: 1,
        startColumn: 1,
        endLine: 1,
        endColumn: 1,
      }),
    );

    expect(error.length).toBe(0);
  });

  it('rejects negative or floating points', async () => {
    const error = await validate(
      Location.from({
        startLine: -1,
        startColumn: -1,
        endLine: 0.5,
        endColumn: 1.5,
      }),
    );

    expect(error[0]).toBeInstanceOf(ValidationError);
  });
});
