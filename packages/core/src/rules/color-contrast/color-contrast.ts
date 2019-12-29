import { getContrast, parseToRgb } from 'polished';
import { ElementHandle } from 'puppeteer';
import { Rule } from '../../domain/rule';
import { Report, ReportLevel } from '../../domain/report';
import { createXPath } from '../../utils/create-xpath';
import { Context } from '../../domain/context';
import { RuleProgressEmitter } from '../../utils/rule-progress-emitter';

// See resources for Contrast ratio:
// https://www.w3.org/TR/WCAG20-TECHS/G18.html
export class ColorContrastRule implements Rule {
  constructor(private readonly context: Context) {}

  meta = {
    name: 'color-contrast',
  };

  progress = new RuleProgressEmitter();

  async countAudits() {
    const { page } = this.context;
    const elements = await page.$$('*');
    return elements.length;
  }

  async audit() {
    const elements = await page.$$('*');
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createColorContrastReport(element);
      if (report) reports.push(report);
      this.progress.emitProgress();
    }

    return reports;
  }

  private isTransparent = (color: string) => {
    const rgba = parseToRgb(color);

    if ('alpha' in rgba && rgba.alpha <= 0) {
      return true;
    }

    return false;
  };

  /* istanbul ignore next */
  private async createColorContrastReport(
    element: ElementHandle,
  ): Promise<Report | undefined> {
    const { t } = this.context;

    const xpath = await createXPath(element);
    const textContent = await element.evaluate(e => e.textContent);
    const outerHTML = await element.evaluate(e => e.outerHTML);
    const style = await element.evaluate(e => getComputedStyle(e).cssText);
    const color = await element.evaluate(e => getComputedStyle(e).color);
    const backgroundColor = await element.evaluate(
      e => getComputedStyle(e).backgroundColor,
    );

    if (
      !backgroundColor ||
      !color ||
      !textContent ||
      this.isTransparent(backgroundColor)
    ) {
      return;
    }

    const contrastRatio = getContrast(backgroundColor, color);

    if (4.5 < contrastRatio && contrastRatio <= 7) {
      return {
        type: 'color-contrast.wcag-aaa',
        rule: this.meta.name,
        level: ReportLevel.WARN,
        message: t(
          'color-contrast.aa',
          'Color contrast ratio should be greater than 7',
        ),
        content: {
          html: outerHTML,
          style,
          xpath,
        },
      };
    }

    if (contrastRatio <= 4.5) {
      return {
        type: 'color-contrast.wcag-aa',
        rule: this.meta.name,
        level: ReportLevel.ERROR,
        message: t(
          'color-contrast.less-than-aa',
          'Color contrast must be greater than 4.5',
        ),
        content: {
          html: outerHTML,
          style,
          xpath,
        },
      };
    }

    return {
      type: 'color-contrast.ok',
      rule: this.meta.name,
      level: ReportLevel.OK,
      content: {
        html: outerHTML,
        xpath,
      },
    };
  }
}
