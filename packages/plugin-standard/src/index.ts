import { Plugin } from '@visi/core';
import { ImgAltRule } from './rules/image-alt';
import { ButtonAltRule } from './rules/button-alt';
import { ColorContrastRule } from './rules/color-contrast';

const plugin: Plugin = {
  rules: [ImgAltRule, ButtonAltRule, ColorContrastRule],
};

export default plugin;
