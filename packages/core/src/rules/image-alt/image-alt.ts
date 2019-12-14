import { Rule } from "../../domain/rule";
import { Report } from "../../domain/report";

const id = "image-alt";

export const imageAlt: Rule = async ({ page }) => {
  const elements = await page.$$("img");
  const reports: Report[] = [];

  for (const element of elements) {
    const hasAlt = await element.evaluate(e => !!e.getAttribute("alt"));

    if (!hasAlt) {
      reports.push({
        id
      });
    }
  }

  return reports;
};
