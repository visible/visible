import vision from '@google-cloud/vision';
import { Plugin } from '@visi/core';

enum FeatureType {
  LANDMARK_DETECTION = 2,
  LABEL_DETECTION = 4,
  TEXT_DETECTION = 5,
}

const timeout = <T>(fn: Promise<T>, ms: number): Promise<T> =>
  Promise.race([
    fn,
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Evaluation timed out')), ms),
    ),
  ]);

export default {
  provider: {
    async imageToText(url: string) {
      const client = new vision.ImageAnnotatorClient();

      try {
        const [result] = await timeout(
          client.annotateImage({
            image: { source: { imageUri: url } },
            features: [
              {
                type: FeatureType.TEXT_DETECTION,
                maxResults: 1,
              },
              {
                type: FeatureType.LANDMARK_DETECTION,
                maxResults: 1,
              },
              {
                type: FeatureType.LABEL_DETECTION,
                maxResults: 1,
              },
            ],
          }),
          10000,
        );

        return (
          result.landmarkAnnotations?.[0]?.description ??
          result.textAnnotations?.[0]?.description ??
          result.labelAnnotations?.[0]?.description
        );
      } catch {
        return;
      }
    },
  },
} as Plugin;
