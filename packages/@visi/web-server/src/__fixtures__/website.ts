import { Website } from '../domain/models';

export const website = Website.from({
  title: 'Example',
  url: 'https://example.com',
  screenshot: 'https://visi.dev/storage/img.png',
});
