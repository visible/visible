import { NextApiRequest, NextApiResponse } from 'next';

import { theme } from '../../theme';
import { I18n } from '../../utils/i18next';

type Request = NextApiRequest & {
  i18n: I18n;
};

export default (req: Request, res: NextApiResponse): void => {
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
  });
};
