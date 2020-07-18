import { Rule, RuleType } from '../domain/models';

export const rule = Rule.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  name: 'img-alt',
  type: RuleType.ATOMIC,
  description: 'foo',
});
