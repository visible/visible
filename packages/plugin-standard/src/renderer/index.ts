import { PluginBrowser } from '@visi/core/renderer';
import { ImgAltRule } from './rules/image-alt';
import { ButtonAltRule } from './rules/button-alt';
import { ColorContrastRule } from './rules/color-contrast';

const plugin: PluginBrowser = {
  rules: [ImgAltRule, ButtonAltRule, ColorContrastRule],
};

export default plugin;
