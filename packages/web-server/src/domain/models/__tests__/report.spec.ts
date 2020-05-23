import { Location } from '../location';
import { HTMLPointer } from '../pointer';
import { Outcome, Report } from '../report';
import { Rule, RuleType } from '../rule';
import { Source } from '../source';

describe('Report', () => {
  const rule = Rule.from({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    name: 'img-alt',
    type: RuleType.ATOMIC,
    description: 'foo',
  });

  const source = Source.from({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    content: '<html></html>',
    title: 'index.html',
    url: 'https://example.com',
  });

  const location = Location.from({
    startColumn: 1,
    startLine: 1,
    endColumn: 1,
    endLine: 1,
  });

  const pointer = HTMLPointer.from({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    reportId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    xpath: '/html/body',
    screenshot: 'https://example.com',
    source,
    location,
  });

  it('accepts valid entity', () => {
    expect(() => {
      Report.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
        target: '/html/body',
        message: 'Error!',
        pointers: [pointer],
      });
    }).not.toThrow();
  });

  it('accepts valid entity with nulls', () => {
    expect(() => {
      Report.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
      });
    }).not.toThrow();
  });

  it('does not accept non-UUID id', () => {
    expect(() => {
      Report.from({
        id: '123123',
        diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
      });
    }).toThrow();
  });

  it('does not accept target longer than 225', () => {
    expect(() => {
      Report.from({
        id: '123123',
        diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
        target: 'a'.repeat(226),
      });
    }).toThrow();
  });

  it('does not accept message longer than 225', () => {
    expect(() => {
      Report.from({
        id: '123123',
        diagnosisId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
        message: 'a'.repeat(226),
      });
    }).toThrow();
  });

  test.todo('invalid diagnosis id');
});
