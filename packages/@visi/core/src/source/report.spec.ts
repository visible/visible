import { Element, Node } from 'domhandler';
import { ElementType } from 'htmlparser2';

import dom from '../__fixture__/dom';
import { Location } from './location';
import { HTMLNode } from './node';
import { Outcome, Report } from './report';

const location = new Location({
  startColumn: 1,
  startLine: 1,
  endColumn: 1,
  endLine: 1,
});

describe('HTMLReport', () => {
  it('creates html instance', () => {
    const report = new Report({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: new HTMLNode(new Node(ElementType.Text)),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(report.ruleId).toBe('foo');
    expect(report.outcome).toBe(Outcome.FAIL);
  });

  it('text method matches', () => {
    const div = new Element('div', {});

    const report = new Report({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: new HTMLNode(div),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(report.text).toBe('<div></div>');
  });

  it('clones', () => {
    const report = new Report({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: new HTMLNode(dom[0]),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(report.clone()).not.toBe(report);
  });

  it('returns self when fixer is not defined', async () => {
    const report = new Report({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      location,
      node: new HTMLNode(dom[0]),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    expect(await report.fix()).toBe(report.node);
  });
});
