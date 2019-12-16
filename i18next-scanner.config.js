/* eslint-disable */
const glob = require('glob');
const typescriptTransform = require('i18next-scanner-typescript');

// Get array of languages from JSON files
const lngs = glob
  .sync('packages/locale/!(*.*)')
  .map(dir => dir.match(/.*\/(.+?)$/)[1]);

// Get array of namespaces
const ns = glob
  .sync('./packages/locale/en/*.json')
  .map(file => file.match(/.*\/(.+?).json$/)[1]);

// Retruns false for non-plural using languages
const plural = lng => {
  return !['ja'].includes(lng);
};

module.exports = {
  transform: typescriptTransform({ extensions: ['.tsx'] }),
  input: [
    './packages/**/*.{ts,tsx}',
  ],
  options: {
    func: {
      extensions: ['.ts', '.tsx'],
      list: ['t', 'props.t', 'i18n.t'],
    },
    trans: {
      component: 'Trans',
      extensions: ['.tsx'],
    },
    resource: {
      loadPath: './packages/locale/{{lng}}/{{ns}}.json',
      savePath: './packages/locale/{{lng}}/{{ns}}.json',
    },
    lngs,
    ns,
    plural,
    sort: true,
    removeUnusedKeys: true,
    defaultNs: 'core',
  },
};
