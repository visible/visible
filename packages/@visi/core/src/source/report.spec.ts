import { Element, Node } from 'domhandler';
import { ElementType } from 'htmlparser2';
import { Declaration } from 'postcss';

import dom from '../__fixture__/dom';
import root from '../__fixture__/root';
import { Location } from './location';
import { CSSReport, HTMLReport, Outcome } from './report';

const location = new Location({
  startColumn: 1,
  startLine: 1,
  endColumn: 1,
  endLine: 1,
});

describe('HTMLReport', () => {
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

    expect(report.ruleId).toBe('foo');
    expect(report.outcome).toBe(Outcome.FAIL);
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

  it('clones', () => {
    const report = new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: dom[0],
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(report.clone()).not.toBe(report);
  });

  it('returns self when fixer is not defined', async () => {
    const report = new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: dom[0],
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(await report.fix()).toBe(report.node);
  });
});

describe('CSSReport', () => {
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

    expect(report.ruleId).toBe('foo');
    expect(report.outcome).toBe(Outcome.FAIL);
  });

  it('clones', () => {
    const report = new CSSReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: root,
      message: 'hello',
      fix: jest.fn(),
      screenshot: '/var/tmp/1.png',
    });

    expect(report.clone()).not.toBe(report);
  });

  it('returns self when fixer is not defined', async () => {
    const report = new CSSReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: root,
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(await report.fix()).toBe(report.node);
  });
});
