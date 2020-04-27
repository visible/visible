import { $$, createXPath, Report, RuleClass, t } from '@visi/core/renderer';

export class ImgAltRule implements RuleClass {
  static id = 'img-alt';
  static type = 'atomic' as const;
  static description = t(
    'plugin-standard:img-alt.description',
    'Checks img has alt',
  );

  async run() {
    const elements = $$('img');
    const reports: Report[] = [];

    if (elements.length === 0) {
      const report: Report = {
        rule: ImgAltRule,
        outcome: 'inapplicable',
      };

      return [report];
    }

    for (const element of elements) {
      const report = await this.createReport(element);
      reports.push(report);
    }

    return reports;
  }

  private async createReport(element: Element): Promise<Report> {
    const alt = element.getAttribute('alt');

    if (!alt) {
      return {
        rule: ImgAltRule,
        outcome: 'fail',
        target: createXPath(element),
        message: t(
          'plugin-standard:img-alt.no-alt',
          'img element must have alt attribute',
        ),
        pointers: [{ type: 'html', xpath: createXPath(element) }],
      };
    }

    return {
      rule: ImgAltRule,
      outcome: 'passed',
      target: createXPath(element),
      pointers: [{ type: 'html', xpath: createXPath(element) }],
    };
  }
}
