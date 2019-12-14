export type ReportID = string;

export interface Report {
  readonly id: ReportID;
  readonly element?: Element;
  readonly fixer?: () => Element;
}
