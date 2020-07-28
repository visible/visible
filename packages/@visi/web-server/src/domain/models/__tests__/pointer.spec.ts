import { validate } from 'class-validator';

import { Location } from '../location';
import { CSSPointer, HTMLPointer } from '../pointer';
import { Source } from '../source';

describe('HTMLPointer', () => {
  const location = Location.from({
    startLine: 1,
    startColumn: 1,
    endLine: 1,
    endColumn: 1,
  });

  const source = Source.from({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    content: '<html></html>',
    title: 'index.html',
    url: 'https://example.com',
  });

  it('accepts valid entity', async () => {
    const error = await validate(
      HTMLPointer.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        reportId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        screenshot: 'https://example.com',
        source,
        location,
        xpath: '/html/body',
      }),
    );

    expect(error.length).toBe(0);
  });
});

describe('CSSPointer', () => {
  const location = Location.from({
    startLine: 1,
    startColumn: 1,
    endLine: 1,
    endColumn: 1,
  });

  const source = Source.from({
    id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    pointerId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
    content: '<html></html>',
    title: 'index.html',
    url: 'https://example.com',
  });

  it('accepts valid entity', async () => {
    const error = await validate(
      CSSPointer.from({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        reportId: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        screenshot: 'https://example.com',
        source,
        location,
        xpath: '/html/body',
        propertyName: 'color',
      }),
    );

    expect(error.length).toBe(0);
  });
});
