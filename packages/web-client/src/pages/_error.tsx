import * as UI from '@visi/web-ui';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
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
      <NextSeo title={title} description={description} />
      <h1>{title}</h1>
      <p>{description}</p>
    </UI.Content>
  );
};

Error.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default Error;
