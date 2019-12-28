import { WebsiteSerializer } from '../website-serializer';
import { Website } from '../../../enterprise/entities';

describe('WebsiteSerializer', () => {
  let websiteSerializer: WebsiteSerializer;

  beforeAll(() => {
    websiteSerializer = new WebsiteSerializer();
  });

  it('serializes properly', () => {
    const website = new Website(
      '123',
      'My website',
      'My first personal website',
      'my-website.com',
      [],
    );

    const result = websiteSerializer.serializeOne(website);

    expect(result).toEqual({
      id: '123',
      name: 'My website',
      description: 'My first personal website',
      domain: 'my-website.com',
      diagnosises: [],
    });
  });
});
