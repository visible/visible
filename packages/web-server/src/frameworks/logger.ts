import log4js from 'log4js';

export const logger = log4js
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
