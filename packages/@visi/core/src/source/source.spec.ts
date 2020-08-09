import { Node } from 'domhandler';
import { ElementType } from 'htmlparser2';
import { Root } from 'postcss';

import { HTMLReport, Outcome } from './report';
import { CSSSource, HTMLSource } from './source';

it('creates html source instance', () => {
  const html = new HTMLSource({
    id: '123',
    content: [new Node(ElementType.Text)],
  });

  expect(html).toMatchInlineSnapshot(`
    HTMLSource {
      "content": Array [
        Node {
          "endIndex": null,
          "next": null,
          "parent": null,
          "prev": null,
          "startIndex": null,
          "type": "text",
        },
      ],
      "id": "123",
      "reports": Array [],
      "type": "html",
      "url": undefined,
      Symbol(immer-draftable): true,
    }
  `);
});

it('is able to add reports', () => {
  const html = new HTMLSource({
    id: '123',
    content: [new Node(ElementType.Text)],
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

it('applies fixes', async () => {
  const fixer = jest.fn();

  const html = new HTMLSource({
    id: '123',
    content: [new Node(ElementType.Text)],
  }).addReport(
    new HTMLReport({
      ruleId: 'foo',
      outcome: Outcome.FAIL,
      target: '/html/body',
      node: new Node(ElementType.Text),
      message: 'hello',
      screenshot: '/var/tmp/1.png',
      fix: fixer,
    }),
  );
  await html.applyFixes();

  expect(fixer).toBeCalled();
});

it('creates html source instance', () => {
  const css = new CSSSource({
    id: '123',
    content: {} as Root,
  });

  expect(css).toMatchInlineSnapshot(`
    CSSSource {
      "content": Object {},
      "id": "123",
      "reports": Array [],
      "type": "css",
      "url": undefined,
      Symbol(immer-draftable): true,
    }
  `);
});
