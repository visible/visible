import { Outcome, Report } from './report';

it('creates instance', () => {
  const report = new Report({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/html/body',
    location: {
      startColumn: 1,
      startLine: 1,
      endColumn: 1,
      endLine: 1,
    },
    message: 'hello',
    fix: jest.fn(),
    screenshot: '/var/tmp/1.png',
  });

  expect(report).toMatchInlineSnapshot(`
    Report {
      "fix": [Function],
      "location": Location {
        "endColumn": 1,
        "endLine": 1,
        "startColumn": 1,
        "startLine": 1,
      },
      "message": "hello",
      "outcome": "fail",
      "ruleId": "foo",
      "screenshot": "/var/tmp/1.png",
      "target": "/html/body",
    }
  `);
});
