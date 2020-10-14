const { nextI18NextRewrites } = require('next-i18next/rewrites');

module.exports = {
  rewrites: async () => nextI18NextRewrites(),

  // https://stackoverflow.com/a/55930009
  serverRuntimeConfig: {
    httpApiUrl: process.env.SERVER_HTTP_API_URL,
    wsApiUrl: process.env.SERVER_WS_API_URL,
  },

  // https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
  publicRuntimeConfig: {
    httpApiUrl: process.env.CLIENT_HTTP_API_URL,
    wsApiUrl: process.env.CLIENT_WS_API_URL,
    gaTrackingId: process.env.GA_TRACKING_ID,
  },
};
