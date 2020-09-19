const { nextI18NextRewrites } = require('next-i18next/rewrites');
const dotenv = require('dotenv');

dotenv.config({ path: '../../../.env' });

module.exports = {
  rewrites: async () => nextI18NextRewrites(),

  // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL,
    streamingApiUrl: process.env.STREAMING_API_URL,
    gaTrackingId: process.env.GA_TRACKING_ID,
  },
};
