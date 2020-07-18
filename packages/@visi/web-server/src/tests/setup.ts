import 'reflect-metadata';

import { Visible } from './core';

jest.mock('@visi/core', () => ({
  __esModule: true,
  Visible,
}));
