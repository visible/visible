import { outdent } from 'outdent';

import { run } from '../../tests/run';
import { LangAttribute } from './lang-attribute';

describe('LangAttribute', () => {
  it('reports when the html does not have lang attribute', async () => {
    const [source] = await run(
      LangAttribute,
      outdent`
        <!DOCTYPE html>
        <html>
          <body></body>
        </html>
      `,
    );

    const report = source.select('/html');
    await report?.fix();

    expect(report).toBeFail();
    expect(report?.node.text).toMatchInlineSnapshot(`
      "<html lang=\\"en\\"><head></head><body>
      </body></html>"
    `);
  });

  it('does not report when the html has lang', async () => {
    const [source] = await run(
      LangAttribute,
      outdent`
        <!DOCTYPE html>
        <html lang="en">
          <body></body>
        </html>
      `,
    );

    const report = source.select('/html');
    expect(report).toBePassed();
  });
});
