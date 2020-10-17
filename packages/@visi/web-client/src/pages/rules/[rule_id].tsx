import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { PagePlaceholder } from '../../components/page-placeholder';
import { Layout } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

const Rule: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.Page>
      <NextSeo
        title={t('rule.title', 'Rule')}
        description={'' /* rule description comes here */}
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

export default Rule;
