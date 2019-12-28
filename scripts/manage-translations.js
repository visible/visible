#!/usr/bin/env node
const glob = require('glob');
const sort = require('gulp-sort');
const vfs = require('vinyl-fs');
const scanner = require('i18next-scanner');
const typescriptTransform = require('i18next-scanner-typescript');

// Retruns false for non-plural using languages
const shouldUsePlural = lng => {
  const nonPluralLanguages = ['ja'];
  return !nonPluralLanguages.includes(lng);
};

const lngs = glob
  .sync(`./packages/core/src/locales/*.json`)
  .map(file => file.match(/.*\/(.+?).json$/)[1]);

const resourceMap = {
  server: './packages/server/src/frameworks/locale/{{lng}}.json',
  client: './packages/client/src/locale/{{lng}}.json',
  cli: './packages/cli/src/locale/{{lng}}.json',
  core: './packages/core/src/locale/{{lng}}.json',
};

const workspaces = Object.keys(resourceMap);

const createConfig = workspace => {
  return {
    transform: typescriptTransform({ extensions: ['.tsx'] }),
    input: [`./packages/${workspace}/src/**/*.{ts,tsx}`],
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
