import express from 'express';
import next from 'next';
import nextI18nextMiddleware from 'next-i18next/middleware';

import nextI18next from './src/utils/i18next';

const port = process.env.CLIENT_PORT ?? 4000;
const app = next({ dev: process.env.NODE_ENV !== 'production' });
const handle = app.getRequestHandler();

(async () => {
  await app.prepare();
  await nextI18next.initPromise;

  express()
    .use(nextI18nextMiddleware(nextI18next))
    .get('*', (req, res) => handle(req, res))
    .listen(port, () => {
      // eslint-disable-next-line no-console
      console.log(`Ready on http://localhost:${port}`);
    });
})();
