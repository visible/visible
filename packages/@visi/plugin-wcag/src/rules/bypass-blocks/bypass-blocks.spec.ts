import { outdent } from 'outdent';

import { run } from '../../tests/run';
import { BypassBlocks } from './bypass-blocks';

describe('BypassBlocks', () => {
  it('reports an error when the page has no landmark', async () => {
    const [source] = await run(
      BypassBlocks,
      outdent`
        <!DOCTYPE html>
        <html lang="en">
        <body>
          <div>header</div>
          <div>main</div>
          <div>footer</div>
        </body>
        </html>
      `,
    );

    const report = source.select('/html/body');
    await report?.fix();

    expect(report).toBeFail();
    expect(report?.node.text).toMatchInlineSnapshot(`
      "<body><a href=\\"#main\\">Jump to the content</a>
        <div id=\\"main\\">header</div>
        <div>main</div>
        <div>footer</div>

      </body>"
    `);
  });

  it('does not report when the page has proper landmarks', async () => {
    const [source] = await run(
      BypassBlocks,
      `
        <!DOCTYPE html>
        <html lang="en">
        <body>
          <header>header</header>
          <main>main</main>
          <footer>footer</footer>
        </body>
        </html>
      `,
    );

    const report = source.select('/html');
    expect(report).toBePassed();
  });

  it('does not report when the any of the link in the page has anchor', async () => {
    const [source] = await run(
      BypassBlocks,
      `
        <!DOCTYPE html>
        <html lang="en">
        <body>
          <a href="#main">Jump to main</a>
          <div>header</div>
          <div id="main">main</div>
          <div>footer</div>
        </body>
        </html>
      `,
    );

    const report = source.select('/html');
    expect(report).toBePassed();
  });
});
