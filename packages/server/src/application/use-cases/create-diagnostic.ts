import { Diagnostic } from '../../domain/entities/diagnostic';
import { DiagnosticsRepository } from '../repositories/diagnostics-repository';

export const createDiagnostic = (
  id: string,
  diagnosticsRepository: DiagnosticsRepository,
) => {
  diagnosticsRepository.create(new Diagnostic(id));
};
