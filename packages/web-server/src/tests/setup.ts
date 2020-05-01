import 'reflect-metadata';

import { Visible } from '../__mocks__/core';

jest.mock('@visi/core', () => ({
  __esModule: true,
  Visible,
}));
