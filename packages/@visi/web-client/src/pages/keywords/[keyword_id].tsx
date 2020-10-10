import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { PagePlaceholder } from '../../components/page-placeholder';
import { Layout } from '../../components/ui';
import { useTranslation } from '../../utils/i18next';

const Keyword: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const keywordId = router.query.keyword_id;

  return (
    <Layout.Page>
      <NextSeo
        title={t('keyword.title', 'Keyword: {{keywordId}}', { keywordId })}
        description={t(
          'keyword.description',
          'Documentation and related information for {{keywordId}}',
          { keywordId },
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

export default Keyword;
