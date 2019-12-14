export type ImageResolvable = string;
export type AudioResolvable = string;
export type TextResolvable = string;
export type VideoResolvable = string;

export interface FixerContext {
  textToLanguage: (text: TextResolvable) => Promise<string>;
  imageToText: (image: ImageResolvable) => Promise<string>;
  audioToText: (audio: AudioResolvable) => Promise<string>;
  videoToText: (video: VideoResolvable) => Promise<string>;
}

export type Fixer = (context: FixerContext) => Promise<string>;
