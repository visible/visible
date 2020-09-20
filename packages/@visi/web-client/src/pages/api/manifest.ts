import { NextApiHandler } from 'next';

import tailwind from '../../../tailwind.config';

const manifest: NextApiHandler = (req, res): void => {
  // const { i18n } = req;
  // const t = i18n.t.bind(i18n);
  // TODO: Use i18next
  const t = (_a: string, b: string) => b;

  res.json({
    name: t('meta.title', 'Visible'),
    short_name: t('meta.title', 'Visible'),
    description: t(
      'meta.description',
      '🦉 Visible is an open-source accessibility testing tool works on Node.js and CI',
    ),
    display: 'standalone',
    start_url: '/',
    theme_color: tailwind.theme.colors.primary[500],
    background_color: tailwind.theme.colors.gray[700],
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
  });
};

export default manifest;
