import { getLuminance, getContrast, parseToRgb } from "polished";
import { Rule } from "../../domain/rule";
import { Report } from "../../domain/report";

const isTransparent = (color: string) => {
  const rgba = parseToRgb(color);

  if ('alpha' in rgba && rgba.alpha <= 0) {
    return true;
  }

  return false;
}

// See resources for Contrast ratio:
// https://www.w3.org/TR/WCAG20-TECHS/G18.html

export const colorContrast: Rule = async ({ page }) => {
  const elements = await page.$$("*");
  const reports: Report[] = [];

  for (const element of elements) {
    const bg = await element.evaluate(e => getComputedStyle(e).backgroundColor);
    const fg = await element.evaluate(e => getComputedStyle(e).color);
    const hasTextContent = await element.evaluate(e => !!e.textContent);
    const html = await element.evaluate(e => e.outerHTML);

    if (!bg || !fg || !hasTextContent || isTransparent(bg)) {
      continue;
    }

    const contrastRatio = getContrast(bg, fg);

    if (contrastRatio <= 4.5) {
      reports.push({
        id: 'color-contrast',
        type: 'error',
        html,
      });
    }
  }

  return reports;
};
