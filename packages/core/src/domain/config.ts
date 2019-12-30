interface RuleOption<T = unknown> {
  use: boolean;
  level: 'ok' | 'warn' | 'error';
  options: T;
}

export interface Config {
  extends: string[];
  plugins: string[];
  rules: Record<string, RuleOption>;
}
