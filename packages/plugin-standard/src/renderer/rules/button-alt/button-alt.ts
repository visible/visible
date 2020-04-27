import { $$, createXPath, Report, RuleClass, t } from '@visi/core/renderer';

export class ButtonAltRule implements RuleClass {
  static id = 'button-alt';
  static type = 'atomic' as const;
  static description = t(
    'plugin-standard:button-alt.description',
    'Checks button has textContent yor title attribute',
  );

  async run() {
    const elements = $$('button');
    const reports: Report[] = [];

    if (elements.length === 0) {
      const report: Report = {
        rule: ButtonAltRule,
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
    const textContent = element.textContent;
    const title = element.getAttribute('title');

    if (!textContent && !title) {
      return {
        rule: ButtonAltRule,
        outcome: 'fail',
        target: createXPath(element),
        message: t(
          'plugin-standard:button-alt.no-alt',
          'button element must have title attribute or text content',
        ),
        pointers: [
          {
            type: 'html',
            xpath: createXPath(element),
          },
        ],
      };
    }

    return {
      rule: ButtonAltRule,
      outcome: 'passed',
      target: createXPath(element),
      pointers: [
        {
          type: 'html',
          xpath: createXPath(element),
        },
      ],
    };
  }
}
