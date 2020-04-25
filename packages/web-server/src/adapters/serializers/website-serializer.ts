import { PartialDeep } from 'type-fest';

import { Website } from '../../domain/models';
import { DiagnosisAPI, DiagnosisSerializer } from './diagnosis-serializer';

export type WebsiteAPI = PartialDeep<{
  id: string;
  name: string;
  description: string;
  domain: string;
  diagnoses: DiagnosisAPI[];
}>;

export class WebsiteSerializer {
  serializeOne(website: Website): PartialDeep<WebsiteAPI> {
    return {
      id: website.id,
      name: website.name,
      description: website.description,
      domain: website.domain,
      diagnoses: new DiagnosisSerializer().transform(website.diagnoses),
    };
  }
}
