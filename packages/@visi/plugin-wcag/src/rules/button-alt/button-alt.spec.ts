import { outdent } from 'outdent';

import { run } from '../../tests/run';
import { ButtonAlt } from './button-alt';

describe('ButtonAlt', () => {
  it('reports fail when button has no text content', async () => {
    const [source] = await run(
      ButtonAlt,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <button></button>
      </body>
      </html>
    `,
    );

    const report = source.select('/html/body/button');
    await report?.fix();

    expect(report).toBeFail();
    expect(report?.node.text).toMatchInlineSnapshot(`"<button></button>"`);
  });

  it('reports passed when button has text', async () => {
    const [source] = await run(
      ButtonAlt,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <button>foo</button>
      </body>
      </html>
    `,
    );

    const report = source.select('/html');
    expect(report).toBePassed();
  });

  it('reports inapplicable when the page does not have any button', async () => {
    const [source] = await run(
      ButtonAlt,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body></body>
      </html>
    `,
    );

    const report = source.select('/html');
    expect(report).toBeInapplicable();
  });
});
