/* eslint-disable no-console */
import { injectable } from 'inversify';

import { Logger } from '../../../domain/services/logger';

@injectable()
export class LoggerConsoleImpl implements Logger {
  log = console.log;
  debug = console.debug;
  info = console.info;
  warn = console.warn;
  error = console.warn;
}
