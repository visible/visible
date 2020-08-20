import { Rule } from '../../domain/models';

export interface FindRuleByReportIdRequest {
  readonly id: string;
}

export interface FindRuleByReportIdResponse {
  readonly rule: Rule;
}

export interface FindRuleByReportIdUseCase {
  run(input: FindRuleByReportIdRequest): Promise<FindRuleByReportIdResponse>;
}
