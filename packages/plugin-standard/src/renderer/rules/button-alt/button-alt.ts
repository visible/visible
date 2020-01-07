import {
  BaseRule,
  Report,
  ReportContent,
  Rule,
} from '@visi/core/dist/renderer';
import { $$ } from '../../utils/$$';
import { createXPath } from '../../utils/create-xpath';

export class ButtonAltRule extends BaseRule implements Rule {
  static meta = {
    name: 'button-alt',
    description: 'Checks button has textContent yor title attribute',
    fixable: true,
  };

  async audit() {
    const elements = $$('button');
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
    const textContent = element.textContent;
    const title = element.getAttribute('title');
    const outerHTML = element.outerHTML;

    if (!textContent && !title) {
      return {
        type: 'button-alt.no-alt',
        rule: ButtonAltRule.meta.name,
        level: 'error',
        message: this.context.t(
          'button-alt.no-alt',
          'button element must have title attribute or text content',
        ),
        content: {
          html: outerHTML,
          xpath: createXPath(element),
        },
      };
    }

    return {
      type: 'button-alt.ok',
      rule: ButtonAltRule.meta.name,
      level: 'ok',
      content: {
        html: outerHTML,
        xpath: createXPath(element),
      },
    };
  }
}
