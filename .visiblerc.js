const path = require('path');

module.exports = {
  plugins: [
    "@visi/plugin-puppeteer",
    "@visi/plugin-standard",
    "@visi/plugin-gcp-vision-api",
  ],
  driver: "@visi/plugin-puppeteer",
  rules: ["@visi/plugin-standard"],
  providers: ["@visi/plugin-gcp-vision-api"],
  settings: {
    delay: 5000,
    screenshot: 'never',
    headless: false,
  }
}
