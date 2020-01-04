interface RuleOption<T = unknown> {
  use: boolean;
  level: 'ok' | 'warn' | 'error';
  options: T;
}

export interface Settings {
  language?: string;
  width?: number;
  height?: number;
  headless?: boolean;
}

export interface Config {
  extends?: string[];
  plugins?: string[];
  settings?: Settings;
  rules?: Record<string, RuleOption>;
}
