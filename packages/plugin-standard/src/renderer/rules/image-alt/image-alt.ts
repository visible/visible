import { Report, ReportContent, BaseRule, Rule } from '@visi/core';
import { createXPath } from '../../utils/create-xpath';
import { $$ } from '../../utils/$$';

export class ImgAltRule extends BaseRule implements Rule {
  static meta = {
    name: 'img-alt',
    description: 'Checks img has alt',
  };

  async audit() {
    const elements = $$('img');
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createReport(element);
      reports.push(report);
    }

    return reports;
  }

  async fix(content: ReportContent) {
    return content;
  }

  private async createReport(element: Element): Promise<Report> {
    const { t } = this.context;
    const xpath = createXPath(element);
    const alt = element.getAttribute('alt');
    const html = element.outerHTML;

    if (!alt) {
      return {
        type: 'img-alt.no-alt',
        rule: ImgAltRule.meta.name,
        level: 'error',
        message: t('img-alt.no-alt', 'img element must have alt attribute'),
        content: {
          xpath,
          html,
        },
      };
    }

    return {
      type: 'img-alt.ok',
      rule: ImgAltRule.meta.name,
      level: 'ok',
      content: {
        xpath,
        html,
      },
    };
  }
}
