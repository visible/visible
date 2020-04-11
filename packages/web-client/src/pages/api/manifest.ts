import { theme } from '@visi/resources';
import { NextApiRequest, NextApiResponse } from 'next';

import { I18n } from '../../utils/i18next';

export default (
  req: NextApiRequest & {
    i18n: I18n;
  },
  res: NextApiResponse,
) => {
  const { i18n } = req;

  const manifest = {
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
        src: '/static/icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: '/static/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };

  res.json(manifest);
};
