import { addTranslations, PluginBrowser } from '@visi/core/renderer';

import en from '../locale/en.json';
import ja from '../locale/ja.json';
import { ButtonAltRule } from './rules/button-alt';
import { ColorContrastRule } from './rules/color-contrast';
import { ImgAltRule } from './rules/image-alt';

addTranslations('en', 'plugin-standard', en);
addTranslations('ja', 'plugin-standard', ja);

const plugin: PluginBrowser = {
  rules: [ImgAltRule, ButtonAltRule, ColorContrastRule],
};

export default plugin;
