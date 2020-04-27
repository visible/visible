import cssReport from '../../__fixtures__/css-property-report.json';
import htmlReport from '../../__fixtures__/html-report.json';
import { Report } from '../../shared';
import { takeScreenshotForXpath } from '../driver/driver-mock';
import { context } from '../post-processors/post-processor-context-mock';
import { ScreenshotFetcher } from './screenshot-fetcher';

describe('ScreenshotFetcher', () => {
  let screenshotFetcher: ScreenshotFetcher;

  beforeEach(() => {
    screenshotFetcher = new ScreenshotFetcher(context);
    takeScreenshotForXpath.mockResolvedValue('foo.png');
  });

  it('takes screenshot for html', async () => {
    await screenshotFetcher.run(htmlReport as Report);

    expect(takeScreenshotForXpath).toBeCalledWith('/html/body/img', {
      path: expect.any(String),
    });
  });

  test.todo('adds path property to the html report');

  it('takes screenshot for css', async () => {
    await screenshotFetcher.run(cssReport as Report);

    expect(takeScreenshotForXpath).toBeCalledWith('/html/body/button', {
      path: expect.any(String),
    });
  });

  test.todo('adds path property to the css report');
});
