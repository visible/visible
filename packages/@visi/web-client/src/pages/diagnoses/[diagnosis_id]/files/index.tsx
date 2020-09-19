import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { PagePlaceholder } from '../../../../components/page-placeholder';
import { Layout } from '../../../../components/ui';
import { useTranslation } from '../../../../utils/i18next';

const DiagnosisFiles: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const diagnosisId = router.query.diagnosis_id;

  return (
    <Layout.Main>
      <NextSeo
        title={t('diagnosis-files.title', 'Files: {{domain}}', {
          domain: diagnosisId,
        })}
        description={t(
          'diagnosis-files.description',
          'Reports for the files that are found at {{domain}}',
          {
            domain: diagnosisId,
          },
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

DiagnosisFiles.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default DiagnosisFiles;
