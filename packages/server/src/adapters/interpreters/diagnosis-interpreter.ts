import uuid from 'uuid';
import {
  Report as CoreReport,
  ReportType as CoreReportType,
} from '@visi/core/dist/domain/report';
import { Diagnosis, Report, ReportType } from '../../enterprise/entities';

export class DiagnosisInterpreter {
  transformType = (type: CoreReportType) => {
    switch (type) {
      case 'ok':
        return ReportType.OK;
      case 'warn':
        return ReportType.WARN;
      case 'error':
      default:
        return ReportType.ERROR;
    }
  };

  transform(reports: CoreReport[]): Diagnosis {
    const id = uuid();

    return new Diagnosis(
      id,
      reports.map(
        report =>
          new Report(
            uuid(),
            report.id,
            id,
            this.transformType(report.type),
            report.message,
            report.content?.xpath,
            report.content?.style,
            report.content?.html,
          ),
      ),
      new Date(),
      new Date(),
    );
  }
}
