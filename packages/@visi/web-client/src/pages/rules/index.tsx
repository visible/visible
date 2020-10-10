import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { PagePlaceholder } from '../../components/page-placeholder';
import { Layout } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

const Rules: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.Page>
      <NextSeo
        title={t('rules.title', 'Rules')}
        description={t(
          'rules.description',
          'The list of rules that are available in Visible',
        )}
      />

      <Layout.Container>
        <Layout.Main>
          <PagePlaceholder />
        </Layout.Main>
      </Layout.Container>
    </Layout.Page>
  );
};

export const getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default Rules;
