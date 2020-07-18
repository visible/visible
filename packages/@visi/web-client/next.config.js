module.exports = {
  env: {
    API_URL: process.env.API_URL || 'http://localhost:3000',
    STREAMING_API_URL: process.env.STREAMING_API_URL || 'ws://localhost:3000',
  },
};
