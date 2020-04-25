import { Source } from '../source';

describe('Source', () => {
  it('accepts valid entity', () => {
    expect(() => {
      new Source({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      });
    }).not.toThrow();
  });

  it('accepts null for title and url', () => {
    expect(() => {
      new Source({
        id: '08eecb12-75a1-4798-aca2-f9e919b1fd56',
        content: '<html></html>',
      });
    }).not.toThrow();
  });

  it('does not accept non-UUID id', () => {
    expect(() => {
      new Source({
        id: '123123',
        content: '<html></html>',
        title: 'index.html',
        url: 'https://example.com',
      });
    }).toThrow();
  });

  it('does not accept empty string', () => {
    expect(() => {
      new Source({
        id: '123123',
        content: '<html></html>',
        title: '',
        url: 'https://example.com',
      });
    }).toThrow();
  });

  it('does not accept invalid URL', () => {
    expect(() => {
      new Source({
        id: '123123',
        content: '<html></html>',
        title: 'title',
        url: 'foo',
      });
    }).toThrow();
  });
});
