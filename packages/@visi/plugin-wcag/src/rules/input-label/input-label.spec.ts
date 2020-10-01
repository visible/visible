import { outdent } from 'outdent';

import { run } from '../../tests/run';
import { InputLabel } from './input-label';

describe(InputLabel, () => {
  it('reports fail when input has no label', async () => {
    const [source] = await run(
      InputLabel,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <input type="text" />
      </body>
      </html>
    `,
    );

    const report = source.select('/html/body/input');
    await report?.fix();

    expect(report).toBeFail();
    expect(source.node.text).toMatchInlineSnapshot(`
      "<!DOCTYPE html><html lang=\\"en\\"><head></head><body>
        <label><input type=\\"text\\">Put a description here</label>

      </body></html>"
    `);
  });

  it('reports passed when input has label as a parent', async () => {
    const [source] = await run(
      InputLabel,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <label>
          Username
          <input type="text" />
        </label>
      </body>
      </html>
    `,
    );

    expect(source.select('/html/body/label/input')).toBePassed();
  });

  it('reports passed when input has label associated with its id', async () => {
    const [source] = await run(
      InputLabel,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <label for="username">Username</label>
        <input type="text" id="username" />
      </body>
      </html>
    `,
    );

    expect(source.select('/html/body/input')).toBePassed();
  });

  it('reports inapplicable when the page has no input', async () => {
    const [source] = await run(
      InputLabel,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body></body>
      </html>
    `,
    );

    expect(source.select('/html')).toBeInapplicable();
  });
});
