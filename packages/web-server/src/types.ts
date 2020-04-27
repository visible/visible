// prettier-ignore
export const TYPES = {
  Connection: Symbol.for('Connection'),
  Logger: Symbol.for('Logger'),
  I18n: Symbol.for('I18n'),

  DiagnosisRepository: Symbol.for('DiagnosisRepository'),
  ReportsRepository: Symbol.for('ReportsRepository'),

  DiagnosisLoader: Symbol.for('DiagnosisLoader'),

  CreateDiagnosisUseCase: Symbol.for('CreateDiagnosisUseCase'),
  FindDiagnosisUseCase: Symbol.for('FindDiagnosisUseCase'),
  DeleteDiagnosisUseCase: Symbol.for('DeleteDiagnosisUseCase'),
  FindReportsByDiagnosisIdUseCase: Symbol.for('FindReportsByDiagnosisIdUseCase'),
};
