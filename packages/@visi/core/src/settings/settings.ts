import deepmerge from 'deepmerge';
import os from 'os';
import path from 'path';

export interface Settings {
  readonly language: string;
  readonly delay: number;
  readonly headless: boolean;
  readonly noSandbox: boolean;
  readonly screenshot: 'always' | 'only-fail' | 'never';
  readonly screenshotDir: string;
  readonly userAgent?: string;
  readonly width?: number;
  readonly height?: number;
  readonly executablePath?: string;
}

const DEFAULTS: Settings = {
  language: 'en',
  delay: 0,
  headless: true,
  noSandbox: false,
  screenshot: 'only-fail',
  screenshotDir: path.join(os.tmpdir(), 'visible'),
};

export const createSettings = (schema: Partial<Settings> = {}) =>
  deepmerge(DEFAULTS, schema);
