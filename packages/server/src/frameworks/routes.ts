import path from 'path';
import express from 'express';
import { theme } from '@visi/ui';
import render from '@visi/client';
import manifest from '@visi/client/dist/manifest.json';

const router = express.Router();

const art = path.resolve(require.resolve('@visi/art'), '..');
const client = path.resolve(require.resolve('@visi/client'), '../..');

router.use(express.static(art)).use(express.static(client));

router.use('/manifest.json', ({ i18n }, res) => {
  res.json({
    name: i18n.t('meta.title', 'Visible'),
    short_name: i18n.t('meta.title', 'Visible'),
    description: i18n.t(
      'meta.description',
      '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
    ),
    display: 'standalone',
    start_url: '/',
    theme_color: theme.highlight.normal,
    background_color: theme.background.normal,
    icons: [
      {
        src: '/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  });
});

router.use(async (req, res) => {
  const result = await render({
    manifest,
    i18n: req.i18n,
    location: req.url,
  });

  res.status(result.statusCode).send(`<!DOCTYPE html>\n${result.staticMarkup}`);
});

export const routes = router;
