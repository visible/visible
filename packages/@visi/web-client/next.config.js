const { nextI18NextRewrites } = require('next-i18next/rewrites');

module.exports = {
  rewrites: async () => nextI18NextRewrites(),

  // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  publicRuntimeConfig: {
    apiUrl: process.env.HTTP_API_URL,
    streamingApiUrl: process.env.WS_API_URL,
    gaTrackingId: process.env.GA_TRACKING_ID,
  },
};
