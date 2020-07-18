#!/usr/bin/env node
const glob = require('glob');
const sort = require('gulp-sort');
const vfs = require('vinyl-fs');
const scanner = require('i18next-scanner');
const typescriptTransform = require('i18next-scanner-typescript');

// Returns false for non-plural using languages
const shouldUsePlural = (lng) => {
  const nonPluralLanguages = ['ja'];
  return !nonPluralLanguages.includes(lng);
};

const lngs = glob
  .sync(`./packages/@visi/cli/src/locale/*.json`)
  .map((file) => file.match(/.*\/(.+?).json$/)[1]);

const resourceMap = {
  cli: './packages/@visi/cli/src/locale/{{lng}}.json',
  'web-server':
    './packages/@visi/web-server/src/frameworks/locale/{{lng}}.json',
  'web-client':
    './packages/@visi/web-client/public/static/locales/{{lng}}/{{ns}}.json',
  'plugin-standard': './packages/@visi/plugin-standard/src/locale/{{lng}}.json',
};

const workspaces = Object.keys(resourceMap);

const createConfig = (workspace) => {
  return {
    transform: typescriptTransform({ extensions: ['.tsx'] }),
    input: [`./packages/@visi/${workspace}/src/**/*.{ts,tsx}`],
    output: '.',
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
        loadPath: resourceMap[workspace],
        savePath: resourceMap[workspace],
      },
      lngs,
      plural: shouldUsePlural,
      sort: true,
      removeUnusedKeys: true,
      defaultNs: workspace,
    },
  };
};

for (const workspace of workspaces) {
  const config = createConfig(workspace);

  vfs
    .src(config.input)
    .pipe(sort())
    .pipe(scanner(config.options, config.transform, config.flush))
    .pipe(vfs.dest(config.output));
}
