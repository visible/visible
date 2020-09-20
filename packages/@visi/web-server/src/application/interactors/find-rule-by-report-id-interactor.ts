import { inject, injectable } from 'inversify';

import { TYPES } from '../../types';
import { DiagnosisRepository, RuleRepository } from '../repositories';
import {
  FindRuleByReportIdRequest,
  FindRuleByReportIdResponse,
  FindRuleByReportIdUseCase,
} from '../use-cases/find-rule-by-report-id-use-case';

@injectable()
export class FindRuleByReportIdInteractor implements FindRuleByReportIdUseCase {
  constructor(
    @inject(TYPES.RuleRepository)
    private readonly ruleRepository: RuleRepository,

    @inject(TYPES.DiagnosisRepository)
    private readonly diagnosisRepository: DiagnosisRepository,
  ) {}

  async run({
    id,
  }: FindRuleByReportIdRequest): Promise<FindRuleByReportIdResponse> {
    const report = await this.diagnosisRepository.findReport(id);

    if (report == null) {
      throw new Error(`No report with id ${id} found`);
    }

    const rule = await this.ruleRepository.findOne(report.ruleId);

    if (rule == null) {
      throw new Error(`No rule with report id ${id} found`);
    }

    return { rule };
  }
}
