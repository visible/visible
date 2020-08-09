import { Element, Node } from 'domhandler';
import { ElementType } from 'htmlparser2';
import { Declaration } from 'postcss';

import { Location } from './location';
import { CSSReport, HTMLReport, Outcome } from './report';

const location = new Location({
  startColumn: 1,
  startLine: 1,
  endColumn: 1,
  endLine: 1,
});

it('creates html instance', () => {
  const report = new HTMLReport({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/html/body',
    location,
    node: new Node(ElementType.Text),
    message: 'hello',
    screenshot: '/var/tmp/1.png',
  });

  expect(report).toMatchInlineSnapshot(`
    HTMLReport {
      "fix": undefined,
      "location": Location {
        "endColumn": 1,
        "endLine": 1,
        "startColumn": 1,
        "startLine": 1,
      },
      "message": "hello",
      "node": Node {
        "endIndex": null,
        "next": null,
        "parent": null,
        "prev": null,
        "startIndex": null,
        "type": "text",
      },
      "outcome": "fail",
      "ruleId": "foo",
      "screenshot": "/var/tmp/1.png",
      "target": "/html/body",
    }
  `);
});

it('text method matches', () => {
  const div = new Element('div', {});

  const report = new HTMLReport({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/html/body',
    location,
    node: div,
    message: 'hello',
    screenshot: '/var/tmp/1.png',
  });

  expect(report.text).toBe('<div></div>');
});

it('creates css instance', () => {
  const location = new Location({
    startColumn: 1,
    startLine: 1,
    endColumn: 1,
    endLine: 1,
  });

  const report = new CSSReport({
    ruleId: 'foo',
    outcome: Outcome.FAIL,
    target: '/html/body',
    location,
    node: {} as Declaration,
    message: 'hello',
    fix: jest.fn(),
    screenshot: '/var/tmp/1.png',
  });

  expect(report).toMatchInlineSnapshot(`
    CSSReport {
      "fix": [Function],
      "location": Location {
        "endColumn": 1,
        "endLine": 1,
        "startColumn": 1,
        "startLine": 1,
      },
      "message": "hello",
      "node": Object {},
      "outcome": "fail",
      "ruleId": "foo",
      "screenshot": "/var/tmp/1.png",
      "target": "/html/body",
    }
  `);
});
