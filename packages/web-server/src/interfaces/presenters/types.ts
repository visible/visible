export enum RuleTypeAPI {
  ATOMIC = 'ATOMIC',
  COMPOSITE = 'COMPOSITE',
}

export interface RuleAPI {
  id: string;
  type: RuleTypeAPI;
  description: string;
}

export interface SourceAPI {
  id: string;
  content: string;
  title?: string;
  url?: string;
}

export interface LocationAPI {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
}

export interface HTMLPointerAPI {
  id: string;
  xpath: string;
  source?: SourceAPI;
  location?: LocationAPI;
  screenshot?: string;
}

export interface CSSPointerAPI {
  id: string;
  xpath: string;
  propertyName: string;
  source?: SourceAPI;
  location?: LocationAPI;
  screenshot?: string;
}

export type PointerAPI = HTMLPointerAPI | CSSPointerAPI;

export enum OutcomeAPI {
  FAIL = 'FAIL',
  PASSED = 'PASSED',
  INAPPLICABLE = 'INAPPLICABLE',
}

export type ReportAPI = {
  id: string;
  outcome: OutcomeAPI;
  rule: RuleAPI;
  target?: string;
  message?: string;
  pointers?: PointerAPI[];
};

export enum StatusAPI {
  STARTED = 'STARTED',
  PROCESSING = 'PROCESSING',
  DONE = 'DONE',
  FAILED = 'FAILED',
}

export interface DiagnosisAPI {
  id: string;
  url: string;
  status: StatusAPI;
  screenshot: string;
  reports: ReportAPI[];
  doneCount: number;
  totalCount: number;
  createdAt: Date;
  updatedAt: Date;
}
