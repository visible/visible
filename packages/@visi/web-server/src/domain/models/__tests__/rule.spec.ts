import { validate, ValidationError } from 'class-validator';

import { Rule, RuleType } from '../rule';

describe('Rule', () => {
  it('accepts valid entity', async () => {
    const error = await validate(
      Rule.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        name: 'img-alt',
        type: RuleType.ATOMIC,
        description: 'foo',
      }),
    );

    expect(error.length).toBe(0);
  });

  it('does not accept description longer than 225', async () => {
    const error = await validate(
      Rule.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        name: 'img-alt',
        type: RuleType.ATOMIC,
        description: 'a'.repeat(226),
      }),
    );

    expect(error[0]).toBeInstanceOf(ValidationError);
  });
});
