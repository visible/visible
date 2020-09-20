import { Plugin } from '@visi/core';

import { DriverFactoryImpl } from './driver-factory-impl';

export default {
  driver: DriverFactoryImpl,
} as Plugin;
