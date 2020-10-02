import { Node } from 'domhandler';
import { ElementType } from 'htmlparser2';

import dom from '../__fixture__/dom';
import { HTMLNode, HTMLRootNode } from './node';
import { Outcome, Report } from './report';
import { Source, SourceType } from './source';

describe('Source', () => {
  it('creates html source instance', () => {
    const html = new Source({
      type: SourceType.HTML,
      url: 'https://example.com',
      node: new HTMLRootNode(dom),
    });
    expect(html.url).toBe('https://example.com');
  });

  it('is able to add reports', () => {
    const html = new Source({
      type: SourceType.HTML,
      node: new HTMLRootNode(dom),
    });

    const report = new Report({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      node: new HTMLNode(new Node(ElementType.Text)),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
    });

    html.addReport(report);
    expect(html.reports[0].ruleId).toBe('foo');
  });

  it('clones', () => {
    const html = new Source({
      type: SourceType.HTML,
      node: new HTMLRootNode(dom),
    });
    expect(html).not.toBe(html.clone());
  });
});
