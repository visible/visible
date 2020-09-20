const path = require('path');

module.exports = {
  plugins: [
    "@visi/plugin-puppeteer",
    "@visi/plugin-wcag",
    "@visi/plugin-gcp-vision-api",
    "@visi/plugin-gcp-translation-api",
  ],
  driver: "@visi/plugin-puppeteer",
  rules: ["@visi/plugin-wcag"],
  providers: [
    "@visi/plugin-gcp-vision-api",
    "@visi/plugin-gcp-translation-api",
  ],
  settings: {
    delay: 5000,
    screenshot: 'never',
    headless: true,
  }
}
