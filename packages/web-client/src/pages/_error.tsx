import * as UI from '@visi/web-ui';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';

import { useTranslation } from '../utils/i18next';

const Error: NextPage = () => {
  const { t } = useTranslation();

  const title = t('void.title', 'You hit the void!');
  const description = t(
    'void.description',
    'The page you were looking for was not found',
  );

  return (
    <UI.Content>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>

      <h1>{t('void.title', 'You hit the void!')}</h1>
      <p>{description}</p>
    </UI.Content>
  );
};

Error.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default Error;
