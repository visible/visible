import { Outcome, Report } from '../domain/models';

export const report = Report.from({
  id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  ruleId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  sourceId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
  outcome: Outcome.FAIL,
  target: '/html/body',
  message: 'Error!',
});
