// prettier-ignore
export const TYPES = {
  Logger: Symbol.for('Logger'),
  I18n: Symbol.for('I18n'),
  Storage: Symbol.for('Storage'),

  Redis: Symbol.for('Redis'),
  Connection: Symbol.for('Connection'),
  Context: Symbol.for('Context'),
  Config: Symbol.for('Config'),
  PubSubEngine: Symbol.for('PubSubEngine'),

  DiagnosisRepository: Symbol.for('DiagnosisRepository'),
  ReportsRepository: Symbol.for('ReportsRepository'),
  RuleRepository: Symbol.for('RuleRepository'),
  PointersRepository: Symbol.for('PointersRepository'),
  SourceRepository: Symbol.for('SourceRepository'),

  ProcessDiagnosisJob: Symbol.for('ProcessDiagnosisJob'),
  PublishDiagnosisJob: Symbol.for('PublishDiagnosisJob'),

  CreateDiagnosisUseCase: Symbol.for('CreateDiagnosisUseCase'),
  FindDiagnosisUseCase: Symbol.for('FindDiagnosisUseCase'),
  DeleteDiagnosisUseCase: Symbol.for('DeleteDiagnosisUseCase'),
  QueueDiagnosisUseCase: Symbol.for('QueueDiagnosisUseCase'),
  ProcessDiagnosisUseCase: Symbol.for('ProcessDiagnosisUseCase'),
  SubscribeDiagnosisUseCase: Symbol.for('SubscribeDiagnosisUseCase'),
};
