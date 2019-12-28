import { PartialDeep } from 'type-fest';

import { Website } from '../../enterprise/entities';
import { DiagnosisSerializer, DiagnosisAPI } from './diagnosis-serializer';

export type WebsiteAPI = PartialDeep<{
  id: string;
  name: string;
  description: string;
  domain: string;
  diagnosises: DiagnosisAPI[];
}>;

export class WebsiteSerializer {
  serializeOne(website: Website): PartialDeep<WebsiteAPI> {
    return {
      id: website.id,
      name: website.name,
      description: website.description,
      domain: website.domain,
      diagnosises: new DiagnosisSerializer().transform(website.diagnosises),
    };
  }
}
