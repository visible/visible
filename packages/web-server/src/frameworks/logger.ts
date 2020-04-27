import { injectable } from 'inversify';
import log4js from 'log4js';

import { Logger } from '../domain/services/logger';

@injectable()
export class LoggerImpl implements Logger {
  private readonly logger = log4js
    .configure({
      appenders: {
        error: {
          type: 'file',
          filename: 'logs/error.log',
        },
      },
      categories: {
        default: {
          appenders: ['error'],
          level: 'error',
        },
      },
    })
    .getLogger();

  log(...args: unknown[]) {
    this.logger.log(...args);
  }

  debug(message: unknown, ...args: unknown[]) {
    this.logger.debug(message, ...args);
  }

  info(message: unknown, ...args: unknown[]) {
    this.logger.info(message, ...args);
  }

  warn(message: unknown, ...args: unknown[]) {
    this.logger.warn(message, ...args);
  }

  error(message: unknown, ...args: unknown[]) {
    this.logger.error(message, ...args);
  }
}
