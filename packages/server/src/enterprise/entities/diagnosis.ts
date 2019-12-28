import { Report } from './report';

export interface Diagnosis {
  id: string;
  reports: Report[];
  // website: Website;
}
