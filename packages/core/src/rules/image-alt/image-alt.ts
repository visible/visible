import { ElementHandle } from 'puppeteer';
import { Rule } from '../../domain/rule';
import { Report, ReportLevel } from '../../domain/report';
import { createXPath } from '../../utils/create-xpath';
import { Context } from '../../domain/context';
import { RuleProgressEmitter } from '../../utils/rule-progress-emitter';

export class ImgAltRule implements Rule {
  constructor(private readonly context: Context) {}

  meta = {
    name: 'img-alt',
  };

  progress = new RuleProgressEmitter();

  async countAudits() {
    const { page } = this.context;
    const elements = await page.$$('img');
    return elements.length;
  }

  async audit() {
    const { page } = this.context;
    const elements = await page.$$('img');
    const reports: Report[] = [];

    for (const element of elements) {
      const report = await this.createImgAltRuleReport(element);
      reports.push(report);
    }

    return reports;
  }

  /* istanbul ignore next */
  private async createImgAltRuleReport(
    element: ElementHandle,
  ): Promise<Report> {
    const { t } = this.context;
    const xpath = await createXPath(element);
    const alt = await element.evaluate(e => e.getAttribute('alt'));
    const html = await element.evaluate(e => e.outerHTML);

    if (!alt) {
      return {
        type: 'img-alt.no-alt',
        rule: this.meta.name,
        level: ReportLevel.ERROR,
        message: t('img-alt.no-alt', 'img element must have alt attribute'),
        content: {
          xpath,
          html,
        },
      };
    }

    return {
      type: 'img-alt.ok',
      rule: this.meta.name,
      level: ReportLevel.OK,
      content: {
        xpath,
        html,
      },
    };
  }
}
