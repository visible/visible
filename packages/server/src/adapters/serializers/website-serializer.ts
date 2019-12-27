import { PartialDeep } from 'type-fest';
import { Website, WebsiteAPI } from '../../enterprise/entities';
import { DiagnosisSerializer } from './diagnosis-serializer';

export class WebsiteSerializer {
  serialize(website: Website): PartialDeep<WebsiteAPI> {
    return {
      id: website.id,
      name: website.name,
      description: website.description,
      domain: website.domain,
      diagnosises: website.diagnosises.map(diagnosis =>
        new DiagnosisSerializer().serialize(diagnosis),
      ),
    };
  }
}
