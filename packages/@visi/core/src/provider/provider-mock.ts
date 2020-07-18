import { Provider } from './provider';

export const imageToText = jest.fn();
export const textToLanguage = jest.fn();

export class ProviderMock implements Provider {
  imageToText = imageToText;
  textToLanguage = textToLanguage;
}
