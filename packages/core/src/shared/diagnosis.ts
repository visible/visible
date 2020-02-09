import { Report } from './report';

export interface Diagnosis {
  reports: Report[];
  doneReportsCount: number;
  totalReportsCount: number;
}
