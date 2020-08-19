export interface Node {
  readonly id: string;
}

export enum RuleType {
  Atomic = 'ATOMIC',
  Composite = 'COMPOSITE',
}

export interface Rule extends Node {
  readonly id: string;
  readonly name: string;
  readonly type: RuleType;
  readonly description: string;
}

export interface Source extends Node {
  readonly id: string;
  readonly content: string;
  readonly reports: readonly Report[];
  readonly url?: string;
  readonly diagnosis?: Diagnosis;
}

export interface Location {
  readonly startLine: number;
  readonly startColumn: number;
  readonly endLine: number;
  readonly endColumn: number;
}

export enum Outcome {
  Fail = 'FAIL',
  Passed = 'PASSED',
  Inapplicable = 'INAPPLICABLE',
}

export type Report = {
  readonly id: string;
  readonly outcome: Outcome;
  // readonly rule: Rule;
  // readonly source: Source;
  readonly target?: string;
  readonly screenshot?: string;
  readonly message?: string;
  readonly diffHunk?: string;
  readonly location?: Location;
};

export enum Status {
  Queued = 'QUEUED',
  Started = 'STARTED',
  Processing = 'PROCESSING',
  Done = 'DONE',
  Failed = 'FAILED',
}

export interface Diagnosis {
  readonly id: string;
  readonly url: string;
  readonly status: Status;
  readonly sources: readonly Source[];
  readonly doneCount: number;
  readonly totalCount: number;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly screenshot?: string;
}
