import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { PagePlaceholder } from '../../../components/page-placeholder';
import { Layout } from '../../../components/ui';
import { useTranslation } from '../../../utils/i18next';

const DiagnosisRules: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const diagnosisId = router.query.diagnosis_id;

  return (
    <Layout.Page>
      <NextSeo
        title={t('diagnosis-rules.title', 'Rules: {{domain}}', {
          domain: diagnosisId,
        })}
        description={t(
          'diagnosis-rules.description',
          'Rules that are raised issues on {{domain}}',
          { domain: diagnosisId },
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

DiagnosisRules.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default DiagnosisRules;
