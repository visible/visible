import puppeteer from "puppeteer";
import { rules } from "./rules";
import { Report } from "./domain/report";

export interface VisibleParams {
  url?: string;
  html?: string;
}

export const visible = async (params: VisibleParams) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  if (params.url) {
    await page.goto(params.url);
  }

  if (params.html) {
    await page.setContent(params.html);
  }

  const reports: Report[] = [];
  const context = { page };

  for (const rule of rules) {
    const newReports = await rule(context);
    reports.push(...newReports);
  }

  await page.close();
  await browser.close();

  return reports;
}
