import { Plugin } from '@visi/core';

import { DriverFactoryImpl } from './driver-impl';

export default {
  driver: DriverFactoryImpl,
} as Plugin;
