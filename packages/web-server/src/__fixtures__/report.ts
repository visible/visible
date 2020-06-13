import { Outcome, Report } from '../domain/models';
import { pointer } from './pointer';
import { rule } from './rule';

export const report = Report.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  outcome: Outcome.FAIL,
  rule,
  target: '/html/body',
  message: 'Error!',
  pointers: [pointer],
});
