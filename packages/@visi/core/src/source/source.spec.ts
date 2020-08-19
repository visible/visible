import { DataNode, Element, Node } from 'domhandler';
import { ElementType, parseDOM } from 'htmlparser2';
import { Node as CSSNode } from 'postcss';

import dom from '../__fixture__/dom';
import html from '../__fixture__/html';
import root from '../__fixture__/root';
import { Location } from './location';
import { CSSReport, HTMLReport, Outcome } from './report';
import { CSSSource, HTMLSource, SourceType } from './source';

describe('HTMLSource', () => {
  it('creates html source instance', () => {
    const html = new HTMLSource({
      content: [new Node(ElementType.Text)],
    });
    expect(html.type).toBe(SourceType.HTML);
  });

  it('is able to add reports', () => {
    const html = new HTMLSource({
      content: dom,
    });

    const report = new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      node: new Node(ElementType.Text),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    const newHtml = html.addReport(report);

    expect(newHtml.reports[0].ruleId).toBe('foo');
  });

  it('clones', () => {
    const html = new HTMLSource({
      content: dom,
    });
    expect(html).not.toBe(html.clone());
  });

  it('applies fixes', async () => {
    const fix = jest.fn();
    const html = new HTMLSource({
      content: dom,
      reports: [
        new HTMLReport({
          ruleId: 'foo',
          outcome: Outcome.FAIL,
          target: '/html',
          node: dom[0],
          fix,
        }),
      ],
    });

    await html.applyFixes();
    expect(fix).toBeCalledTimes(1);
  });

  it('applies single fix without modifying the original', async () => {
    const localDom = parseDOM(html, {
      withEndIndices: true,
      withStartIndices: true,
    });

    const source = new HTMLSource({
      content: localDom,
    });
    const report = new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/div/p',
      // eslint-disable-next-line
      node: (localDom[0] as any).children[0],
      location: new Location({
        startLine: 1,
        endLine: 1,
        startColumn: 5,
        endColumn: 22,
      }),
      async fix(node: Node) {
        if (node instanceof Element) {
          node.children = [new DataNode(ElementType.Text, 'Goodnight')];
        }
        return node;
      },
    });

    const clone = await source.clone().apply(report.clone());
    expect(source.text).toBe(`<div><p>Hello world</p></div>`);
    expect(clone.text).toBe('<div><p>Goodnight</p></div>');
  });

  it('applies single fix', async () => {
    const source = new HTMLSource({
      content: dom,
    });
    const report = new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/div',
      node: dom[0],
      location: new Location({
        startLine: 1,
        endLine: 1,
        startColumn: 0,
        endColumn: 28,
      }),
      async fix(node: Node) {
        if (node instanceof Element) {
          node.children = [new DataNode(ElementType.Text, 'Goodnight')];
        }
        return node;
      },
    });

    const patched = await source.apply(report);
    expect(patched.text).toBe('<div>Goodnight</div>');
  });
});

describe('CSSSource', () => {
  it('creates css source instance', () => {
    const css = new CSSSource({
      content: root,
    });

    expect(css.type).toBe(SourceType.CSS);
  });

  it('clones', () => {
    const css = new CSSSource({
      content: root,
    });
    expect(css.clone()).not.toBe(css);
  });

  it('applies fixes', async () => {
    const fix = jest.fn();
    const css = new CSSSource({
      content: root,
      reports: [
        new CSSReport({
          ruleId: 'foo',
          outcome: Outcome.FAIL,
          target: '/html',
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          node: {} as any,
          fix,
        }),
      ],
    });

    await css.applyFixes();
    expect(fix).toBeCalledTimes(1);
  });

  it('is able to add reports', () => {
    const source = new CSSSource({
      content: root,
    });

    const report = new CSSReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      node: root.first!, //eslint-disable-line
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    const newSource = source.addReport(report);
    expect(newSource.reports[0].ruleId).toBe('foo');
  });

  it('applies single fix', async () => {
    const source = new CSSSource({
      content: root,
    });

    const report = new CSSReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/div',
      node: (root as any).first.first, // eslint-disable-line
      location: new Location({
        startLine: 3,
        endLine: 3,
        startColumn: 3,
        endColumn: 13,
      }),
      async fix(node: CSSNode) {
        if (node.type === 'decl') {
          node.value = 'blue';
        }
        return node;
      },
    });

    const patched = await source.apply(report);
    expect(patched.text).toBe(`
div {
  color: blue;
}
`);
  });
});
