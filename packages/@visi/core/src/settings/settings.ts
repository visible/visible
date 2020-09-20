import deepmerge from 'deepmerge';
import os from 'os';
import path from 'path';

export interface Settings {
  readonly delay: number;
  readonly screenshot: 'always' | 'only-fail' | 'never';
  readonly screenshotDir: string;
  readonly maxReportsCountPerRule: number;

  // TODO: decouple puppeteer specific things
  readonly language: string;
  readonly headless: boolean;
  readonly noSandbox: boolean;
  readonly userAgent?: string;
  readonly width?: number;
  readonly height?: number;
  readonly executablePath?: string;
}

const DEFAULTS: Settings = {
  delay: 0,
  maxReportsCountPerRule: Number.POSITIVE_INFINITY,
  language: 'en',
  headless: true,
  noSandbox: false,
  screenshot: 'only-fail',
  screenshotDir: path.join(os.tmpdir(), 'visible'),
};

export const createSettings = (schema: Partial<Settings> = {}): Settings =>
  deepmerge(DEFAULTS, schema);
