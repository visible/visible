import { Rule } from '../../domain/rule';
import { Report } from '../../domain/report';

export const buttonAlt: Rule = async ({ page, t }) => {
  const elements = await page.$$('button');
  const reports: Report[] = [];

  for (const element of elements) {
    const hasTextContent = await element.evaluate(
      /* istanbul ignore next */ e => !!e.textContent,
    );

    const hasTitle = await element.evaluate(
      /* istanbul ignore next */ e => !!e.getAttribute('title'),
    );

    const html = await element.evaluate(
      /* istanbul ignore next */ e => e.outerHTML,
    );

    if (!hasTextContent && !hasTitle) {
      reports.push({
        id: 'button-alt',
        type: 'error',
        html,
        message: t(
          'core:button-alt.no-alt',
          'button element must have title attribute or text content',
        ),
      });

      continue;
    }

    reports.push({
      id: 'button-alt',
      type: 'ok',
      html,
    });
  }

  return reports;
};
