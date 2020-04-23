import { $$, createXPath, Report, RuleClass, t } from '@visi/core/renderer';
import { getContrast, parseToRgb } from 'polished';

export class ColorContrastRule implements RuleClass {
  static id = 'color-contrast';
  static type = 'atomic' as const;
  static description = t(
    'plugin-standard:color-contrast.description',
    'Checks color contrast ratio',
  );

  async run() {
    const elements = $$('*');
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createReport(element);
      if (report) reports.push(report);
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

  private async createReport(element: Element): Promise<Report | undefined> {
    const textContent = element.textContent;
    const { color, backgroundColor } = getComputedStyle(element);

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
        rule: ColorContrastRule,
        outcome: 'fail',
        target: createXPath(element),
        message: t(
          'plugin-standard:color-contrast.aa',
          'Color contrast ratio should be greater than 7',
        ),
        pointers: [
          {
            type: 'css-property',
            xpath: createXPath(element),
            propertyName: 'color',
          },
          {
            type: 'css-property',
            xpath: createXPath(element),
            propertyName: 'background-color',
          },
        ],
      };
    }

    if (contrastRatio <= 4.5) {
      return {
        rule: ColorContrastRule,
        outcome: 'fail',
        target: createXPath(element),
        message: t(
          'plugin-standard:color-contrast.less-than-aa',
          'Color contrast must be greater than 4.5',
        ),
        pointers: [
          {
            type: 'css-property',
            xpath: createXPath(element),
            propertyName: 'color',
          },
          {
            type: 'css-property',
            xpath: createXPath(element),
            propertyName: 'background-color',
          },
        ],
      };
    }

    return {
      rule: ColorContrastRule,
      outcome: 'passed',
      target: createXPath(element),
      pointers: [
        {
          type: 'css-property',
          xpath: createXPath(element),
          propertyName: 'color',
        },
        {
          type: 'css-property',
          xpath: createXPath(element),
          propertyName: 'background-color',
        },
      ],
    };
  }
}
