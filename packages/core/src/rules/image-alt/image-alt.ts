import { Rule } from '../../domain/rule';
import { Report } from '../../domain/report';

export const imageAlt: Rule = async ({ page }) => {
  const elements = await page.$$('img');
  const reports: Report[] = [];

  for (const element of elements) {
    const hasAlt = await element.evaluate(e => !!e.getAttribute('alt'));
    const html = await element.evaluate(e => e.outerHTML);

    if (!hasAlt) {
      reports.push({
        id: 'image-alt',
        type: 'error',
        html,
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
