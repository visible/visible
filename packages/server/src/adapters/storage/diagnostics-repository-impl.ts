import { DiagnosticsRepository } from '../../application/repositories/diagnostics-repository';
import { Diagnostic } from '../../domain/entities/diagnostic';
import { Diagnostic as DiagnosticEntity } from '../../infrastructure/database/entities/diagnostic';

export class DiagnosticsRepositoryImpl extends DiagnosticsRepository {
  create(diagnostic: Diagnostic) {
    const diagnosticEntity = new DiagnosticEntity();
    diagnosticEntity.id = diagnostic.id;
    this.repository.save(diagnosticEntity);
  }
}
