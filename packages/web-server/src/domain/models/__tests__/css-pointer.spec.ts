import { CSSPointer } from '../css-pointer';
import { Location } from '../location';
import { Source } from '../source';

describe('CSSPointer', () => {
  const location = new Location({
    startLine: 1,
    startColumn: 1,
    endLine: 1,
    endColumn: 1,
  });

  const source = new Source({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    content: '<html></html>',
    title: 'index.html',
    url: 'https://example.com',
  });

  it('accepts valid entity', () => {
    expect(() => {
      new CSSPointer({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        screenshot: 'https://example.com',
        source,
        location,
        xpath: '/html/body',
        propertyName: 'color',
      });
    }).not.toThrow();
  });
});
