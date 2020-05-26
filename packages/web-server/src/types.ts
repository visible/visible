// prettier-ignore
export const TYPES = {
  Logger: Symbol.for('Logger'),
  I18n: Symbol.for('I18n'),
  Storage: Symbol.for('Storage'),

  Connection: Symbol.for('Connection'),
  Context: Symbol.for('Context'),
  Config: Symbol.for('Config'),

  DiagnosisRepository: Symbol.for('DiagnosisRepository'),
  ReportRepository: Symbol.for('ReportRepository'),
  RuleRepository: Symbol.for('RuleRepository'),
  PointerRepository: Symbol.for('PointerRepository'),
  SourceRepository: Symbol.for('SourceRepository'),

  ProcessDiagnosisJob: Symbol.for('ProcessDiagnosisJob'),
  PublishDiagnosisJob: Symbol.for('PublishDiagnosisJob'),

  CreateDiagnosisUseCase: Symbol.for('CreateDiagnosisUseCase'),
  FindDiagnosisUseCase: Symbol.for('FindDiagnosisUseCase'),
  DeleteDiagnosisUseCase: Symbol.for('DeleteDiagnosisUseCase'),
  ProcessDiagnosisUseCase: Symbol.for('ProcessDiagnosisUseCase'),
  SubscribeDiagnosisUseCase: Symbol.for('SubscribeDiagnosisUseCase'),
};
