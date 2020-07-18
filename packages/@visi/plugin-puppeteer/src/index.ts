import { Plugin } from '@visi/core';

import { DriverPuppeteerImpl } from './driver-impl';

export default {
  driver: DriverPuppeteerImpl,
} as Plugin;
