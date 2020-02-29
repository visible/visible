import * as UI from '@visi/web-ui';
import React from 'react';
import Helmet from 'react-helmet';
import { useTranslation } from 'react-i18next';

export const Void = () => {
  const { t } = useTranslation();

  const title = t('void.title', 'You hit the void!');
  const description = t(
    'void.description',
    'The page you were looking for was not found',
  );

  return (
    <UI.Content>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Helmet>

      <h1>{t('void.title', 'You hit the void!')}</h1>
      <p>{description}</p>
    </UI.Content>
  );
};
