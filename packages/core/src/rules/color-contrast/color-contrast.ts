import { getContrast, parseToRgb, darken } from 'polished';
import { Rule } from '../../domain/rule';
import { Report } from '../../domain/report';

const isTransparent = (color: string) => {
  const rgba = parseToRgb(color);

  if ('alpha' in rgba && rgba.alpha <= 0) {
    return true;
  }

  return false;
};

const fixContrastRatio = (fg: string, bg: string): string => {
  return [
    ['color', fg],
    ['background-color', darken(0.5, bg)],
  ]
    .map(rule => rule.join(': '))
    .join('; ');
};

// See resources for Contrast ratio:
// https://www.w3.org/TR/WCAG20-TECHS/G18.html

export const colorContrast: Rule = async ({ page, t }) => {
  const elements = await page.$$('*');
  const reports: Report[] = [];

  for (const element of elements) {
    const hasTextContent = await element.evaluate(
      /* istanbul ignore next */ e => !!e.textContent,
    );
    const html = await element.evaluate(
      /* istanbul ignore next */ e => e.outerHTML,
    );
    const fg = await element.evaluate(
      /* istanbul ignore next */ e => getComputedStyle(e).color,
    );
    const bg = await element.evaluate(
      /* istanbul ignore next */ e => getComputedStyle(e).backgroundColor,
    );
    const style = await element.evaluate(
      /* istanbul ignore next */ e => getComputedStyle(e).cssText,
    );

    if (!bg || !fg || !hasTextContent || isTransparent(bg)) {
      continue;
    }

    const contrastRatio = getContrast(bg, fg);

    if (4.5 < contrastRatio && contrastRatio <= 7) {
      reports.push({
        id: 'color-contrast',
        type: 'warn',
        html,
        message: t(
          'color-contrast.aa',
          'Color contrast ratio should be greater than 7',
        ),
        content: {
          html,
          style,
        },
        fix: async () => ({
          style: fixContrastRatio(fg, bg),
        }),
      });

      continue;
    }

    if (contrastRatio <= 4.5) {
      reports.push({
        id: 'color-contrast',
        type: 'error',
        html,
        message: t(
          'core:color-contrast.less-than-aa',
          'Color contrast must be greater than 4.5',
        ),
      });

      continue;
    }

    reports.push({
      id: 'color-contrast',
      type: 'ok',
      html,
    });
  }

  return reports;
};
