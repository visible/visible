import { Rule } from '../../domain/rule';
import { Report } from '../../domain/report';

export const imageAlt: Rule = async ({ page, t }) => {
  const elements = await page.$$('img');
  const reports: Report[] = [];

  for (const element of elements) {
    const hasAlt = await element.evaluate(
      /* istanbul ignore next */ e => !!e.getAttribute('alt'),
    );
    const html = await element.evaluate(
      /* istanbul ignore next */ e => e.outerHTML,
    );

    if (!hasAlt) {
      reports.push({
        id: 'image-alt',
        type: 'error',
        html,
        message: t('img-alt.no-alt', 'img element must have alt attribute'),
      });

      continue;
    }

    reports.push({
      id: 'image-alt',
      type: 'ok',
      html,
    });
  }

  return reports;
};
