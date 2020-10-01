import { run } from '../../tests/run';
import { ImgAlt } from './img-alt';

describe('ImgAlt', () => {
  it('reports fail when alt is not set', async () => {
    const [source] = await run(
      ImgAlt,
      `
        <!DOCTYPE html>
        <html lang="en">
          <body>
            <img src="https://example.com" />
          </body>
        </html>
      `,
    );

    const report = source.select('/html/body/img');
    await report?.fix();

    expect(report).toBeFail();
    expect(report?.node.text).toMatchInlineSnapshot(
      `"<img src=\\"https://example.com\\" alt=\\"caption\\">"`,
    );
  });

  it('reports fail when alt has no text', async () => {
    const [source] = await run(
      ImgAlt,
      `
        <!DOCTYPE html>
        <html lang="en">
          <body>
            <img src="https://example.com" alt=" " />
          </body>
        </html>
      `,
    );

    expect(source.select('/html/body/img')).toBeFail();
  });

  it("doesn't report an error when img has an alt", async () => {
    const [source] = await run(
      ImgAlt,
      `
        <!DOCTYPE html>
        <html lang="en">
          <body>
            <img src="https://example.com" alt="My image" />
          </body>
        </html>
      `,
    );

    expect(source.select('/html/body/img')).toBePassed();
  });

  it('returns inapplicable when page does not have any image', async () => {
    const [source] = await run(
      ImgAlt,
      `
        <!DOCTYPE html>
        <html lang="en">
          <body>
            <p>foo</p>
          </body>
        </html>
      `,
    );

    expect(source.select('/html')).toBeInapplicable();
  });
});
