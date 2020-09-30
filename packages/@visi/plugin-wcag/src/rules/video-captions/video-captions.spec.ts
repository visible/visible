import { outdent } from 'outdent';

import { run } from '../../tests/run';
import { VideoCaptions } from './video-captions';

describe(VideoCaptions, () => {
  it('reports fail when video has not track as its children', async () => {
    const [source] = await run(
      VideoCaptions,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <video src="https://example.com" type="video/mp4" />
      </body>
      </html>
    `,
    );

    expect(source.select('/html/body/video')).toBeFail();
  });

  it('reports passed when video has tracks', async () => {
    const [source] = await run(
      VideoCaptions,
      outdent`
      <!DOCTYPE html>
      <html lang="en">
      <body>
        <video src="https://example.com" type="video/mp4">
          <track kind="captions" srclang="en" src="https://example.com" />
        </video>
      </body>
      </html>
    `,
    );

    expect(source.select('/html')).toBePassed();
  });

  it('reports inapplicable when the page has no video', async () => {
    const [source] = await run(
      VideoCaptions,
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
