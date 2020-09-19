import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import React from 'react';

import { PagePlaceholder } from '../../components/page-placeholder';
import { Layout } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

const Rules: NextPage = () => {
  const { t } = useTranslation();

  return (
    <Layout.Main>
      <NextSeo
        title={t('rules.title', 'Rules')}
        description={t(
          'rules.description',
          'The list of rules that are available in Visible',
        )}
      />

      <Layout.Container>
        <Layout.Content>
          <PagePlaceholder />
        </Layout.Content>
      </Layout.Container>
    </Layout.Main>
  );
};

Rules.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default Rules;
