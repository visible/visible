const { nextI18NextRewrites } = require('next-i18next/rewrites');

module.exports = {
  rewrites: async () => nextI18NextRewrites(),
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
    STREAMING_API_URL: process.env.STREAMING_API_URL || 'ws://localhost:3000',
  },
};
