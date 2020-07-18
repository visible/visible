import { Plugin } from '@visi/core';

import { ButtonAlt } from './rules/button-alt/button-alt';
import { ImgAlt } from './rules/img-alt/img-alt';

export default {
  rules: [ImgAlt, ButtonAlt],
} as Plugin;
