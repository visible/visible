import uuid from 'uuid';
import { Report } from '@visi/core/dist/domain/report';
import { Diagnosis } from '../../enterprise/entities';

export class DiagnosisInterpreter {
  transform(reports: Report[]): Diagnosis {
    return {
      id: uuid(),
      reports: reports.map(report => ({
        id: uuid(),
        name: report.id,
        type: report.type,
        message: report.message,
        xpath: report.content && report.content.xpath,
        html: report.content && report.content.html,
        css: report.content && report.content.style,
      })),
    };
  }
}
