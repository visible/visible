export type ImageResolvable = string;
export type AudioResolvable = string;
export type TextResolvable = string;
export type VideoResolvable = string;

export interface Fixers {
  textToLanguage?: (text: TextResolvable) => Promise<string>;
  imageToText?: (image: ImageResolvable) => Promise<string>;
  audioToText?: (audio: AudioResolvable) => Promise<string>;
  videoToText?: (video: VideoResolvable) => Promise<string>;
}
