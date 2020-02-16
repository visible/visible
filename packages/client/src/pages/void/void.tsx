import React from 'react';
import Helmet from 'react-helmet';
import * as UI from '@visi/ui';
import { useTranslation } from 'react-i18next';

export const Void = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('void.title', 'You hit the void!')}</title>
      </Helmet>
      <UI.Content>
        <h1>{t('void.title', 'You hit the void!')}</h1>
      </UI.Content>
    </>
  );
};
