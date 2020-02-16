import path from 'path';
import express from 'express';
import render from '@visi/client';
import manifest from '@visi/client/dist/manifest.json';

const router = express.Router();

const art = path.resolve(require.resolve('@visi/art'), '..');
const client = path.resolve(require.resolve('@visi/client'), '../..');

router
  .use(express.static(art))
  .use(express.static(client))
  .use(async (req, res) => {
    const result = await render({
      manifest,
      i18n: req.i18n,
      location: req.url,
    });

    res.status(result.statusCode);
    res.send(`<!DOCTYPE html>\n${result.staticMarkup}`);
  });

export const routes = router;
