import { Connection } from 'typeorm';
// import { visible } from '@visi/core';
// import { ReportSerializer } from '../serializers/report-serializer';
import { createDiagnostic } from '../../application/use-cases/create-diagnostic';
import { DiagnosticsRepositoryImpl } from '../storage/diagnostics-repository-impl';
import { Diagnostic } from '../../infrastructure/database/entities/diagnostic';

export class DiagnosticsController {
  constructor(private connection: Connection) {}

  async diagnoseURL(_url: string) {
    // const reports = await visible({ url });

    const diagnoticRepository = new DiagnosticsRepositoryImpl(
      this.connection.getRepository(Diagnostic),
    );

    const diagnostic = createDiagnostic('id', diagnoticRepository);

    return diagnostic;

    // return {
    //   id: '1',
    //   reports: new ReportSerializer().serialize(reports),
    // };
  }
}
