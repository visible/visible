import { Report, ReportLevel, Context, Rule, ReportContent } from '@visi/core';
import { getContrast, parseToRgb } from 'polished';
// import { createXPath } from '../../../../core/src/utils/create-xpath';
// import { Context } from '../../../../core/src/domain/context';
// import { RuleProgressEmitter } from '../../../../core/src/utils/rule-progress-emitter';

export class ColorContrastRule implements Rule {
  constructor(private readonly context: Context) {}

  static meta = {
    name: 'color-contrast',
    description: 'Checks color contrast ratio',
    url: 'https://www.w3.org/TR/WCAG20-TECHS/G18.html',
    fixable: true,
  };

  async audit() {
    const elements = Array.from(document.querySelectorAll('*'));
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createColorContrastReport(element);
      if (report) reports.push(report);
    }

    return reports;
  }

  async fix(content: ReportContent) {
    return content;
  }

  private isTransparent = (color: string) => {
    const rgba = parseToRgb(color);

    if ('alpha' in rgba && rgba.alpha <= 0) {
      return true;
    }

    return false;
  };

  private async createColorContrastReport(
    element: Element,
  ): Promise<Report | undefined> {
    const { t } = this.context;

    // const xpath = await createXPath(element);
    const textContent = element.textContent;
    const outerHTML = element.outerHTML;
    const style = getComputedStyle(element).cssText;
    const color = getComputedStyle(element).color;
    const backgroundColor = getComputedStyle(element).backgroundColor;

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
        rule: ColorContrastRule.meta.name,
        level: ReportLevel.WARN,
        message: t(
          'color-contrast.aa',
          'Color contrast ratio should be greater than 7',
        ),
        content: {
          html: outerHTML,
          style,
          xpath: '',
        },
      };
    }

    if (contrastRatio <= 4.5) {
      return {
        type: 'color-contrast.wcag-aa',
        rule: ColorContrastRule.meta.name,
        level: ReportLevel.ERROR,
        message: t(
          'color-contrast.less-than-aa',
          'Color contrast must be greater than 4.5',
        ),
        content: {
          html: outerHTML,
          style,
          xpath: '',
        },
      };
    }

    return {
      type: 'color-contrast.ok',
      rule: ColorContrastRule.meta.name,
      level: ReportLevel.OK,
      content: {
        html: outerHTML,
        xpath: '',
      },
    };
  }
}
