// prettier-ignore
export const TYPES = {
  Logger: Symbol.for('Logger'),
  I18n: Symbol.for('I18n'),
  Storage: Symbol.for('Storage'),
  Analyzer: Symbol.for('Analyzer'),

  Connection: Symbol.for('Connection'),
  Redis: Symbol.for('Redis'),
  Context: Symbol.for('Context'),
  Config: Symbol.for('Config'),
  VisiblePool: Symbol.for('VisiblePool'),

  DiagnosisRepository: Symbol.for('DiagnosisRepository'),
  RuleRepository: Symbol.for('RuleRepository'),
  StatsRepository: Symbol.for('StatsRepository'),

  ProcessDiagnosisQueue: Symbol.for('ProcessDiagnosisQueue'),
  ProcessDiagnosisQueueEvents: Symbol.for('ProcessDiagnosisQueueEvents'),

  CreateDiagnosisUseCase: Symbol.for('CreateDiagnosisUseCase'),
  CreateRuleUseCase: Symbol.for('CreateRuleUseCase'),
  FindRuleByReportIdUseCase: Symbol.for('FindRuleByReportIdUseCase'),
  FindDiagnosisUseCase: Symbol.for('FindDiagnosisUseCase'),
  DeleteDiagnosisUseCase: Symbol.for('DeleteDiagnosisUseCase'),
  ProcessDiagnosisUseCase: Symbol.for('ProcessDiagnosisUseCase'),
  SubscribeDiagnosisUseCase: Symbol.for('SubscribeDiagnosisUseCase'),
  FindStatsUseCase: Symbol.for('FindStatsUseCase'),
  SubscribeStatsUseCase: Symbol.for('SubscribeStatsUseCase'),
};
