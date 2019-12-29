import { ElementHandle } from 'puppeteer';
import { Rule } from '../../domain/rule';
import { Report, ReportLevel } from '../../domain/report';
import { createXPath } from '../../utils/create-xpath';
import { Context } from '../../domain/context';
import { RuleProgressEmitter } from '../../utils/rule-progress-emitter';

export class ButtonAltRule implements Rule {
  meta = {
    name: 'button-alt',
  };

  progress = new RuleProgressEmitter();

  constructor(private context: Context) {}

  async countAudits() {
    const { page } = this.context;
    const elements = await page.$$('button');
    return elements.length;
  }

  async audit() {
    const { page } = this.context;
    const elements = await page.$$('button');
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createNoAltReport(element);
      reports.push(report);
      this.progress.emitProgress();
    }

    return reports;
  }

  /* istanbul ignore next */
  private async createNoAltReport(element: ElementHandle): Promise<Report> {
    const { t } = this.context;
    const textContent = await element.evaluate(e => e.textContent);
    const title = await element.evaluate(e => e.getAttribute('title'));
    const outerHTML = await element.evaluate(e => e.outerHTML);

    if (!textContent && !title) {
      return {
        type: 'button-alt.no-alt',
        rule: this.meta.name,
        level: ReportLevel.ERROR,
        message: t(
          'button-alt.no-alt',
          'button element must have title attribute or text content',
        ),
        content: {
          html: outerHTML,
          xpath: await createXPath(element),
        },
      };
    }

    return {
      type: 'button-alt.ok',
      rule: this.meta.name,
      level: ReportLevel.OK,
      content: {
        html: outerHTML,
        xpath: await createXPath(element),
      },
    };
  }
}
