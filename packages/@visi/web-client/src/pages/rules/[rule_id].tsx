import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { PagePlaceholder } from '../../components/page-placeholder';
import { Layout } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

const Rule: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.Main>
      <NextSeo
        title={t('rule.title', 'Rule')}
        description={'' /* rule description comes here */}
      />

      <Layout.Container>
        <Layout.Content>
          <PagePlaceholder />
        </Layout.Content>
      </Layout.Container>
    </Layout.Main>
  );
};

Rule.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default Rule;
