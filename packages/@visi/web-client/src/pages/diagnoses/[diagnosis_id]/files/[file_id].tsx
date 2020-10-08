import { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import React from 'react';

import { PagePlaceholder } from '../../../../components/page-placeholder';
import { Layout } from '../../../../components/ui';
import { useTranslation } from '../../../../utils/i18next';

const DiagnosisFile: NextPage = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const fileId = router.query.file_id;

  return (
    <Layout.Page>
      <NextSeo
        title={t('diagnosis-file.title', 'File: {{name}}', { name: fileId })}
        description={t(
          'diagnosis-file.description',
          'Detailed reports for the file {{name}} provided by Visible',
          { name: fileId },
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

DiagnosisFile.getInitialProps = async () => ({
  namespacesRequired: ['web-client'],
});

export default DiagnosisFile;
