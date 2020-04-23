import { Pointer, Report } from '../../shared';
import { Driver } from '../driver';
import { PostProcessor, PostProcessorContext } from './post-processor';

type Condition = 'always' | 'only-fail' | 'never';

export class ScreenshotFetcher implements PostProcessor {
  private readonly driver: Driver;
  private readonly condition: Condition;

  constructor(context: PostProcessorContext) {
    this.driver = context.driver;
    this.condition = context.config.settings?.screenshot ?? 'always';
  }

  private screenshotCache = new Map<string, string>();

  async takeScreenshotForXPath(xpath: string) {
    const path = 'tmp/' + Date.now().toString() + '.png';

    await this.driver.takeScreenshotForXpath(xpath, {
      path,
    });

    return path;
  }

  async run(report: Report) {
    if (report.outcome === 'inapplicable' || this.condition === 'never') {
      return report;
    }

    if (this.condition === 'only-fail' && report.outcome !== 'fail') {
      return report;
    }

    const pointers: Pointer[] = [];

    for (const pointer of report.pointers) {
      if (pointer.type !== 'html' && pointer.type !== 'css-property') {
        pointers.push(pointer);
        continue;
      }

      const { xpath } = pointer;
      const cache = this.screenshotCache.get(xpath);

      if (cache) {
        pointers.push({ ...pointer, screenshot: cache });
        continue;
      }

      try {
        const path = await this.takeScreenshotForXPath(xpath);
        pointers.push({ ...pointer, screenshot: path });
        this.screenshotCache.set(xpath, path);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
        pointers.push(pointer);
      }
    }

    return { ...report, pointers };
  }
}
