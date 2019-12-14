import puppeteer from "puppeteer";
import { Report } from "./report";

export interface Context {
  readonly page: puppeteer.Page;
}

export type Rule = (context: Context) => Promise<(Report | undefined)[]>;
