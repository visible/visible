import { Repository } from 'typeorm';
import { Diagnostic } from '../../domain/entities/diagnostic';
import { Diagnostic as DiagnosticEntity } from '../../infrastructure/database/entities/diagnostic';

export class DiagnosticsRepository {
  constructor(protected repository: Repository<DiagnosticEntity>) {}

  create(diagnositc: Diagnostic) {
    this.repository.create(diagnositc);
  }
}
