import { Rule } from "../../domain/rule";
import { Report } from "../../domain/report";

export const id = "button-id";

export const buttonAlt: Rule = async ({ page }) => {
  const elements = await page.$$("button");
  const reports: Report[] = [];

  for (const element of elements) {
    const hasTextContent = await element.evaluate(e => !!e.textContent);
    const hasTitle = await element.evaluate(e => !!e.getAttribute("title"));

    if (!hasTextContent && !hasTitle) {
      reports.push({
        id
      });
    }
  }

  return reports;
};
