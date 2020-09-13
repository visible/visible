import { Plugin } from '@visi/core';

import { ButtonAlt } from './rules/button-alt/button-alt';
import { BypassBlocks } from './rules/bypass-blocks/bypass-blocks';
import { Contrast } from './rules/contrast/contrast';
import { ImgAlt } from './rules/img-alt/img-alt';
import { InputLabel } from './rules/input-label/input-label';
import { LangAttribute } from './rules/lang-attribute/lang-attribute';
import { VideoCaptions } from './rules/video-captions/video-captions';

export default {
  rules: [
    ButtonAlt,
    BypassBlocks,
    Contrast,
    ImgAlt,
    InputLabel,
    LangAttribute,
    VideoCaptions,
  ],
} as Plugin;
