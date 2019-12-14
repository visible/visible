import { getLuminance, getContrast } from "polished";
import { Rule } from "../../domain/rule";
import { Report } from "../../domain/report";

const id = "color-contrast";

// See resources for Contrast ratio:
// https://www.w3.org/TR/WCAG20-TECHS/G18.html

export const colorContrast: Rule = async ({ page }) => {
  const elements = await page.$$("*");
  const reports: Report[] = [];

  for (const element of elements) {
    const bg = await element.evaluate(e => getComputedStyle(e).backgroundColor);
    const fg = await element.evaluate(e => getComputedStyle(e).color);
    const hasTextContent = await element.evaluate(e => !!e.textContent);

    console.log(bg, fg, hasTextContent);

    if (!bg || !fg || !hasTextContent) {
      continue;
    }

    const contrastRatio = getContrast(bg, fg);

    if (contrastRatio <= 4.5) {
      reports.push({
        id
      });
    }
  }

  return reports;
};
