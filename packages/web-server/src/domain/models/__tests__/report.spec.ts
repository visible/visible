import { HTMLPointer } from '../html-pointer';
import { Outcome, Report } from '../report';
import { Rule, RuleType } from '../rule';
import { Source } from '../source';

describe('Report', () => {
  const rule = new Rule({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    type: RuleType.ATOMIC,
    description: 'foo',
  });

  const source = new Source({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    content: '<html></html>',
    title: 'index.html',
    url: 'https://example.com',
  });

  const pointer = new HTMLPointer({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    xpath: '/html/body',
    screenshot: 'https://example.com',
    source,
    location: {
      startColumn: 0,
      startLine: 0,
      endColumn: 0,
      endLine: 0,
    },
  });

  it('accepts valid entity', () => {
    expect(() => {
      new Report({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
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
      new Report({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        outcome: Outcome.FAIL,
        rule,
      });
    }).not.toThrow();
  });

  it('does not accept non-UUID id', () => {
    expect(() => {
      new Report({
        id: '123123',
        outcome: Outcome.FAIL,
        rule,
      });
    }).toThrow();
  });

  it('does not accept target longer than 225', () => {
    expect(() => {
      new Report({
        id: '123123',
        outcome: Outcome.FAIL,
        rule,
        target: 'a'.repeat(226),
      });
    }).toThrow();
  });

  it('does not accept message longer than 225', () => {
    expect(() => {
      new Report({
        id: '123123',
        outcome: Outcome.FAIL,
        rule,
        message: 'a'.repeat(226),
      });
    }).toThrow();
  });
});
