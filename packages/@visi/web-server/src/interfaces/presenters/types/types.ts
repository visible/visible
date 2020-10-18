export interface Node {
  readonly id: string;
}

export enum RuleType {
  Atomic = 'ATOMIC',
  Composite = 'COMPOSITE',
}

export interface Rule extends Node {
  readonly id: string;
  readonly coreId: string;
  readonly name: string;
  readonly type: RuleType;
  readonly description: string;
  readonly keywords?: readonly string[];
  readonly mapping?: readonly string[];
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

export enum Impact {
  Minor = 'MINOR',
  Serious = 'SERIOUS',
  Critical = 'CRITICAL',
}

export enum Difficulty {
  Easy = 'EASY',
  Medium = 'MEDIUM',
  Difficult = 'DIFFICULT',
}

export type Report = {
  readonly id: string;
  readonly outcome: Outcome;
  readonly impact?: Impact;
  readonly difficulty?: Difficulty;
  readonly target?: string;
  readonly screenshot?: string;
  readonly message?: string;
  readonly diffHunk?: string;
  readonly location?: Location;
  // readonly rule: Rule;
  // readonly source: Source;
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
