// prettier-ignore
export const TYPES = {
  Logger: Symbol.for('Logger'),
  I18n: Symbol.for('I18n'),
  Storage: Symbol.for('Storage'),
  Analyzer: Symbol.for('Analyzer'),

  Connection: Symbol.for('Connection'),
  Context: Symbol.for('Context'),
  Config: Symbol.for('Config'),
  Visible: Symbol.for('Visible'),

  DiagnosisRepository: Symbol.for('DiagnosisRepository'),
  RuleRepository: Symbol.for('RuleRepository'),

  ProcessDiagnosisQueue: Symbol.for('ProcessDiagnosisQueue'),

  CreateDiagnosisUseCase: Symbol.for('CreateDiagnosisUseCase'),
  CreateRuleUseCase: Symbol.for('CreateRuleUseCase'),
  FindRuleByReportIdUseCase: Symbol.for('FindRuleByReportIdUseCase'),
  FindDiagnosisUseCase: Symbol.for('FindDiagnosisUseCase'),
  DeleteDiagnosisUseCase: Symbol.for('DeleteDiagnosisUseCase'),
  ProcessDiagnosisUseCase: Symbol.for('ProcessDiagnosisUseCase'),
  SubscribeDiagnosisUseCase: Symbol.for('SubscribeDiagnosisUseCase'),
};
