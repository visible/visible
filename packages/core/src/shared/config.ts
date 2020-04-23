export interface Settings {
  readonly browser?: 'chrome' | 'firefox';
  readonly language?: string;
  readonly userAgent?: string;
  readonly delay?: number;
  readonly width?: number;
  readonly height?: number;
  readonly headless?: boolean;
  readonly noSandbox?: boolean;
  readonly executablePath?: string;
  readonly screenshot?: 'always' | 'only-fail' | 'never';
}

export interface Config {
  readonly extends?: string[];
  readonly plugins?: string[];
  readonly settings?: Settings;
}
