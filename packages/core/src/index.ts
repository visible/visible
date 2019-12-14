import puppeteer from "puppeteer";
import { rules } from "./rules";

const main = async () => {
  const [, , url] = process.argv;
  if (!url) process.exit(1);

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  const context = { page };

  const reports = await Promise.all(
    rules.map(rule => rule(context))
  ).then(reports => reports.flat());

  console.log(JSON.stringify(reports));

  await browser.close();
};

main();
