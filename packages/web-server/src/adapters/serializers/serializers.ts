import {
  CSSPointer,
  Diagnosis,
  HTMLPointer,
  Location,
  Outcome,
  Pointer,
  Report,
  Rule,
  RuleType,
  Source,
  Status,
} from '../../domain/models';
import {
  CSSPointerAPI,
  DiagnosisAPI,
  HTMLPointerAPI,
  LocationAPI,
  OutcomeAPI,
  PointerAPI,
  ReportAPI,
  RuleAPI,
  RuleTypeAPI,
  SourceAPI,
  StatusAPI,
} from './types';

export const transformRuleType = (ruleType: RuleType): RuleTypeAPI => {
  switch (ruleType) {
    case RuleType.ATOMIC:
      return RuleTypeAPI.ATOMIC;
    case RuleType.COMPOSITE:
      return RuleTypeAPI.COMPOSITE;
  }
};

export const transformOutcome = (outcome: Outcome) => {
  switch (outcome) {
    case Outcome.FAIL:
      return OutcomeAPI.FAIL;
    case Outcome.PASSED:
      return OutcomeAPI.PASSED;
    case Outcome.INAPPLICABLE:
      return OutcomeAPI.INAPPLICABLE;
  }
};

export const transformLocation = (location: Location): LocationAPI => location;
export const transformSource = (source: Source): SourceAPI => source;
export const transformHTMLPointer = (pointer: HTMLPointer): HTMLPointerAPI =>
  pointer;
export const transformCSSPointer = (pointer: CSSPointer): CSSPointerAPI =>
  pointer;
export const transformPointer = (pointer: Pointer): PointerAPI => {
  if (pointer instanceof HTMLPointer) {
    return transformHTMLPointer(pointer);
  }

  if (pointer instanceof CSSPointer) {
    return transformCSSPointer(pointer);
  }

  throw new Error('unknown pointer type');
};

export const transformRule = (rule: Rule): RuleAPI => {
  return {
    id: rule.id,
    type: transformRuleType(rule.type),
    description: rule.description,
  };
};

export const transformReport = (report: Report): ReportAPI => {
  return {
    id: report.id,
    target: report.target,
    outcome: transformOutcome(report.outcome),
    message: report.message,
    rule: transformRule(report.rule),
    pointers: report.pointers?.map(pointer => transformPointer(pointer)) ?? [],
  };
};

export const transformStatus = (status: Status): StatusAPI => {
  switch (status) {
    case Status.DONE:
      return StatusAPI.DONE;
    case Status.FAILED:
      return StatusAPI.FAILED;
    case Status.PROCESSING:
      return StatusAPI.PROCESSING;
    case Status.STARTED:
      return StatusAPI.STARTED;
  }
};

export const transformDiagnosis = (diagnosis: Diagnosis): DiagnosisAPI => {
  return {
    id: diagnosis.id,
    status: transformStatus(diagnosis.status),
    screenshot: diagnosis.screenshot,
    reports: diagnosis.reports.map(report => transformReport(report)),
    doneCount: diagnosis.doneCount,
    totalCount: diagnosis.totalCount,
    createdAt: diagnosis.createdAt,
    updatedAt: diagnosis.updatedAt,
  };
};
