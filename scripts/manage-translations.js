#!/usr/bin/env node
/* eslint-disable */
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

const getConfig = (workspace) => {
	const lngs = glob
		.sync(`./packages/${workspace}/src/locales/*.json`)
		.map(file => file.match(/.*\/(.+?).json$/)[1]);

	return {
		transform: typescriptTransform({ extensions: ['.tsx'] }),
		input: [
			`./packages/${workspace}/src/**/*.{ts,tsx}`,
		],
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
				loadPath: `./packages/${workspace}/src/locales/{{lng}}.json`,
				savePath: `./packages/${workspace}/src/locales/{{lng}}.json`,
			},
			lngs,
			plural: shouldUsePlural,
			sort: true,
			removeUnusedKeys: true,
			defaultNs: workspace,
		},
	}
}

const workspaces = glob
	.sync('./packages/!(*.*)')
	.map(dir => dir.match(/.*\/(.+?)$/)[1]);

for (const workspace of workspaces) {
	const config = getConfig(workspace);

	vfs.src(config.input)
		.pipe(sort())
		.pipe(scanner(config.options, config.transform, config.flush))
		.pipe(vfs.dest(config.output))
}

