import { PartialDeep } from 'type-fest';
import { Website, WebsiteAPI } from '../../enterprise/entities';
import { DiagnosisSerializer } from './diagnosis-serializer';

export class WebsiteSerializer {
  serializeOne(website: Website): PartialDeep<WebsiteAPI> {
    return {
      id: website.id,
      name: website.name,
      description: website.description,
      domain: website.domain,
      diagnosises: new DiagnosisSerializer().serialize(website.diagnosises),
    };
  }
}
