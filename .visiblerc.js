const path = require('path');

module.exports = {
  "driver": "@visi/plugin-puppeteer",
  "plugins": [
    "@visi/plugin-puppeteer",
    "@visi/plugin-standard",
    "@visi/plugin-gcp-vision-api",
  ]
}
