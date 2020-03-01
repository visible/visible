import { theme } from '@visi/resources';
import render from '@visi/web-client';
import manifest from '@visi/web-client/dist/manifest.json';
import express from 'express';
import path from 'path';

const router = express.Router();

const assets = path.resolve(require.resolve('@visi/resources/assets'), '..');
const client = path.resolve(require.resolve('@visi/web-client'), '../..');

router.use(express.static(assets)).use(express.static(client));

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

router.use(async ({ i18n, url }, res) => {
  const result = await render({
    manifest,
    location: url,
    language: i18n.language,
  });

  res.status(result.statusCode).send(`<!DOCTYPE html>\n${result.staticMarkup}`);
});

export const routes = router;
