import { Rule, RuleType } from '../rule';

describe('Rule', () => {
  it('accepts valid entity', () => {
    expect(() => {
      new Rule({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        type: RuleType.ATOMIC,
        description: 'foo',
      });
    }).not.toThrow();
  });

  it('does not accept description longer than 225', () => {
    expect(() => {
      new Rule({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        type: RuleType.ATOMIC,
        description: 'a'.repeat(226),
      });
    }).toThrow();
  });
});
