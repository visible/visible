import vision from '@google-cloud/vision';
import { Plugin } from '@visi/core';

export default {
  provider: {
    async imageToText(url: string) {
      const client = new vision.ImageAnnotatorClient();
      const [result] = await client.landmarkDetection({
        image: { source: { imageUri: url } },
      });
      const labels = result.landmarkAnnotations;
      return labels?.[0].description;
    },
  },
} as Plugin;
